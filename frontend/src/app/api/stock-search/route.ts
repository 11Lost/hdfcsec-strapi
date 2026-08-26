import { NextRequest, NextResponse } from 'next/server';
import yahooFinanceClass from 'yahoo-finance2';
const yahooFinance = new (yahooFinanceClass as any)();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    const searchResult = (await yahooFinance.search(q)) as any;
    const quotes = searchResult.quotes
      .filter(
        (q: any) =>
          q.isYahooFinance &&
          (q.exchange === 'NSI' ||
            q.exchange === 'BSE' ||
            q.symbol.endsWith('.NS') ||
            q.symbol.endsWith('.BO'))
      )
      .slice(0, 10)
      .map((q: any) => ({
        symbol: q.symbol,
        name: q.shortname || q.longname || q.symbol,
        exchange: q.exchDisp || q.exchange,
      }));

    return NextResponse.json({ results: quotes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ results: [] });
  }
}
