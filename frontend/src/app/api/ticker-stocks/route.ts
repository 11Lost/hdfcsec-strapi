import { NextResponse } from 'next/server';
import yahooFinanceClass from 'yahoo-finance2';
const yahooFinance = new (yahooFinanceClass as any)();

export async function GET() {
  try {
    const symbols = [
      'MRF.NS', 'AXISBANK.NS', 'IDBI.NS', 'RELIANCE.NS', 'HDFCBANK.NS',
      'INFY.NS', 'TCS.NS', 'ITC.NS', 'SBIN.NS', 'ICICIBANK.NS',
      'BAJFINANCE.NS', 'BHARTIARTL.NS', 'KOTAKBANK.NS', 'LT.NS',
      'ASIANPAINT.NS', 'HINDUNILVR.NS', 'MARUTI.NS', 'SUNPHARMA.NS',
      'TATAMOTORS.NS', 'TATASTEEL.NS'
    ];
    const quotes = await yahooFinance.quote(symbols);
    
    const data = quotes.map((q: any) => ({
      indexSymbol: (q.shortname || q.symbol).replace('.NS', ''),
      last: q.regularMarketPrice,
      percentChange: q.regularMarketChangePercent
    }));
    
    return NextResponse.json({ data });
  } catch (err) {
    console.error('[api/ticker-stocks]', err);
    return NextResponse.json({ data: [] }, { status: 502 });
  }
}
