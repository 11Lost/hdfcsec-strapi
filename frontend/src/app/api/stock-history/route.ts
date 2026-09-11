import { NextRequest, NextResponse } from 'next/server';
import yahooFinanceClass from 'yahoo-finance2';

const yahooFinance = new (yahooFinanceClass as any)();

export const dynamic = 'force-dynamic';

/** Queries like "RELIANCE.NS" or "INFY.BO" are exact Yahoo symbols. */
function isSymbolQuery(q: string): boolean {
  return q.includes('.') && /^[A-Za-z0-9][A-Za-z0-9.\-]{0,19}$/.test(q);
}

/**
 * Annualized return of `months` equal monthly investments that are worth
 * `finalValue` today. Solves XIRR numerically (bisection): the installment
 * made in month i has been invested for (months - 1 - i) / 12 years.
 */
function sipAnnualizedReturn(
  monthlyAmount: number,
  months: number,
  finalValue: number
): number {
  const futureValueAt = (rate: number) => {
    let value = 0;
    for (let i = 0; i < months; i++) {
      value += monthlyAmount * Math.pow(1 + rate, (months - 1 - i) / 12);
    }
    return value;
  };

  let low = -0.95;
  let high = 10; // 1000% annualized is beyond any realistic result
  if (futureValueAt(high) <= finalValue) return high;

  for (let iter = 0; iter < 200; iter++) {
    const mid = (low + high) / 2;
    if (futureValueAt(mid) > finalValue) high = mid;
    else low = mid;
  }
  return (low + high) / 2;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();
  const period = Math.min(
    Math.max(parseInt(searchParams.get('period') || '5', 10) || 5, 1),
    25
  );
  const amount = parseFloat(searchParams.get('amount') || '1650');
  const mode = searchParams.get('mode') === 'LUMPSUM' ? 'LUMPSUM' : 'SIP';

  if (!q) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  try {
    // 1. Resolve symbol: use exact symbols directly, otherwise search
    let symbol: string | null = null;
    let name: string | null = null;

    if (isSymbolQuery(q)) {
      try {
        const quote = (await yahooFinance.quote(q)) as any;
        if (quote?.symbol && quote?.regularMarketPrice != null) {
          symbol = quote.symbol;
          name = quote.shortName || quote.longName || quote.symbol;
        }
      } catch {
        // not a valid symbol; fall through to search
      }
    }

    if (!symbol) {
      const searchResult = (await yahooFinance.search(q)) as any;
      const quotes = (searchResult.quotes || []).filter(
        (r: any) =>
          r.isYahooFinance &&
          (r.exchange === 'NSI' ||
            r.exchange === 'BSE' ||
            r.symbol.endsWith('.NS') ||
            r.symbol.endsWith('.BO'))
      );
      if (quotes.length === 0) {
        return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
      }
      symbol = quotes[0].symbol;
      name = quotes[0].shortname || quotes[0].longname || symbol;
    }

    // 2. Historical monthly prices
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - period);

    const chartData = (await yahooFinance.chart(symbol, {
      period1: startDate,
      period2: endDate,
      interval: '1mo',
    })) as any;

    // Prefer adjclose so dividends/splits are reflected in returns
    let history = (chartData.quotes || [])
      .filter((row: any) => row && (row.adjclose ?? row.close) != null)
      .map((row: any) => ({
        date: row.date as Date,
        price: Number(row.adjclose ?? row.close),
      }));

    if (history.length === 0) {
      return NextResponse.json({ error: 'No historical data' }, { status: 404 });
    }

    // Yahoo adds one extra candle for the current, still-running month
    // (e.g. 13 monthly candles for a 1Y window). Drop the extra so exactly
    // `period * 12` monthly data points remain.
    while (history.length > period * 12) {
      history.pop();
    }

    const n = history.length;
    const currentPrice = history[n - 1].price;

    let invested = 0;
    let totalValue = 0;
    const yearlyData: { label: string; invested: number; value: number }[] = [];

    if (mode === 'SIP') {
      let totalUnits = 0;
      history.forEach((point: { price: number }, index: number) => {
        if (point.price > 0) {
          totalUnits += amount / point.price;
          invested += amount;
        }
        // Chart point at the end of every 12th month and at the series end
        if ((index + 1) % 12 === 0 || index === n - 1) {
          yearlyData.push({
            label: `${Math.ceil((index + 1) / 12)}Y`,
            invested: Math.round(invested),
            value: Math.round(totalUnits * point.price),
          });
        }
      });
      totalValue = totalUnits * currentPrice;
    } else {
      // LUMPSUM: the full amount is invested at the first available price
      invested = amount;
      const initialPrice = history[0].price;
      const units = initialPrice > 0 ? amount / initialPrice : 0;
      history.forEach((point: { price: number }, index: number) => {
        if ((index + 1) % 12 === 0 || index === n - 1) {
          yearlyData.push({
            label: `${Math.ceil((index + 1) / 12)}Y`,
            invested: Math.round(amount),
            value: Math.round(units * point.price),
          });
        }
      });
      totalValue = units * currentPrice;
    }

    const profit = totalValue - invested;
    const profitRate = invested > 0 ? (profit / invested) * 100 : 0;

    // Annualized return: XIRR-style IRR for SIP, CAGR for lumpsum
    const yearsElapsed = n > 1 ? (n - 1) / 12 : 1 / 12;
    let annualized = 0;
    if (invested > 0 && totalValue > 0) {
      annualized =
        mode === 'SIP'
          ? sipAnnualizedReturn(amount, n, totalValue) * 100
          : (Math.pow(totalValue / invested, 1 / yearsElapsed) - 1) * 100;
    }

    return NextResponse.json({
      symbol,
      name,
      invested: Math.round(invested),
      totalValue: Math.round(totalValue),
      profit: Math.round(profit),
      profitRate: profitRate.toFixed(2),
      cagr: annualized.toFixed(2),
      currentPrice,
      months: n,
      yearlyData,
    });
  } catch (error) {
    console.error('stock-history error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch stock data. Please try again.' },
      { status: 500 }
    );
  }
}
