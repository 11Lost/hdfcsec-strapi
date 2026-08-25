import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://www.nseindia.com/api/allIndices', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) throw new Error(`NSE responded with ${res.status}`);
    const json = await res.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error('[api/nse-indices]', err);
    return NextResponse.json({ data: [] }, { status: 502 });
  }
}
