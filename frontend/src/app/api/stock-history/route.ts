import { NextRequest, NextResponse } from 'next/server';
import yahooFinanceClass from 'yahoo-finance2';
const yahooFinance = new (yahooFinanceClass as any)();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q'); // e.g. "Reliance"
  const period = parseInt(searchParams.get('period') || '5', 10);
  const amount = parseFloat(searchParams.get('amount') || '1650');
  const mode = searchParams.get('mode') || 'SIP';

  if (!q) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    // 1. Search for symbol
    const searchResult = (await yahooFinance.search(q)) as any;
    const quotes = searchResult.quotes.filter(
      (q: any) =>
        q.isYahooFinance &&
        (q.exchange === 'NSI' ||
          q.exchange === 'BSE' ||
          q.symbol.endsWith('.NS') ||
          q.symbol.endsWith('.BO'))
    );

    if (quotes.length === 0) {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
    }
    const symbol = quotes[0].symbol;
    const shortname = quotes[0].shortname || symbol;

    // 2. Get Historical Data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - period);

    const history = (await yahooFinance.historical(symbol, {
      period1: startDate,
      period2: endDate,
      interval: '1mo',
    })) as any[];

    if (history.length === 0) {
      return NextResponse.json({ error: 'No historical data' }, { status: 404 });
    }

    let invested = 0;
    let totalValue = 0;
    const currentPrice = history[history.length - 1].close;
    const yearlyData: { label: string; invested: number; value: number }[] = [];

    if (mode === 'SIP') {
      let totalUnits = 0;
      let currentInvested = 0;
      history.forEach((dataPoint: any, index: number) => {
        const price = dataPoint.close;
        if (price > 0) {
          totalUnits += amount / price;
          currentInvested += amount;
        }
        if ((index + 1) % 12 === 0 || index === history.length - 1) {
          yearlyData.push({
            label: `${Math.ceil((index + 1) / 12)}Y`,
            invested: Math.round(currentInvested),
            value: Math.round(totalUnits * price),
          });
        }
      });
      totalValue = totalUnits * currentPrice;
      invested = currentInvested;
    } else {
      // LUMPSUM
      invested = amount;
      const initialPrice = history[0].close;
      if (initialPrice > 0) {
        const units = amount / initialPrice;
        history.forEach((dataPoint: any, index: number) => {
          if ((index + 1) % 12 === 0 || index === history.length - 1) {
            yearlyData.push({
              label: `${Math.ceil((index + 1) / 12)}Y`,
              invested: amount,
              value: Math.round(units * dataPoint.close),
            });
          }
        });
        totalValue = units * currentPrice;
      }
    }

    const profit = totalValue - invested;
    const profitRate = invested > 0 ? (profit / invested) * 100 : 0;
    const cagr = invested > 0 && totalValue > 0 ? (Math.pow(totalValue / invested, 1 / period) - 1) * 100 : 0;

    return NextResponse.json({
      symbol,
      name: shortname,
      invested: Math.round(invested),
      totalValue: Math.round(totalValue),
      profit: Math.round(profit),
      profitRate: profitRate.toFixed(2),
      cagr: cagr.toFixed(2),
      currentPrice: currentPrice,
      yearlyData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
