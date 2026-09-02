import { NextResponse } from 'next/server';
import yahooFinanceClass from 'yahoo-finance2';
const yahooFinance = new (yahooFinanceClass as any)();

export async function GET() {
  try {
    const symbols = [
      '^CNX500', 'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'ICICIBANK.NS', 'INFY.NS', 
      'ITC.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'BAJFINANCE.NS', 'LICI.NS', 
      'KOTAKBANK.NS', 'LT.NS', 'HINDUNILVR.NS', 'AXISBANK.NS', 'ASIANPAINT.NS', 
      'MARUTI.NS', 'SUNPHARMA.NS', 'TATAMOTORS.NS', 'TATASTEEL.NS', 'TITAN.NS', 
      'ULTRACEMCO.NS', 'NTPC.NS', 'BAJAJFINSV.NS', 'NESTLEIND.NS', 'ONGC.NS', 
      'POWERGRID.NS', 'M&M.NS', 'WIPRO.NS', 'ADANIENT.NS', 'ADANIPORTS.NS', 
      'HCLTECH.NS', 'JSWSTEEL.NS', 'GRASIM.NS', 'COALINDIA.NS', 'TECHM.NS', 
      'SBILIFE.NS', 'HDFCLIFE.NS', 'DIVISLAB.NS', 'DRREDDY.NS', 'EICHERMOT.NS', 
      'BAJAJ-AUTO.NS', 'INDUSINDBK.NS', 'CIPLA.NS', 'TATACONSUM.NS', 'APOLLOHOSP.NS', 
      'UPL.NS', 'BRITANNIA.NS', 'BPCL.NS', 'HEROMOTOCO.NS', 'SHREECEM.NS', 
      'HINDALCO.NS', 'CHOLAFIN.NS', 'SIEMENS.NS', 'SRF.NS', 'DLF.NS', 'TVSMOTOR.NS', 
      'PIDILITIND.NS', 'HAVELLS.NS', 'BANKBARODA.NS', 'AMBUJACEM.NS', 'INDIGO.NS', 
      'TATACHEM.NS', 'IRCTC.NS', 'BOSCHLTD.NS', 'PNB.NS', 'BEL.NS', 'MOTHERSON.NS', 
      'MUTHOOTFIN.NS', 'HAL.NS', 'GAIL.NS', 'VEDL.NS', 'ICICIPRULI.NS', 'LTIM.NS', 
      'DABUR.NS', 'GODREJCP.NS', 'ICICIGI.NS', 'HDFCAMC.NS', 'BERGEPAINT.NS', 
      'MARICO.NS', 'COLPAL.NS', 'TRENT.NS', 'MCDOWELL-N.NS', 'PFC.NS', 'RECLTD.NS', 
      'TORNTPHARM.NS', 'SHRIRAMFIN.NS', 'CGPOWER.NS', 'AUBANK.NS', 'ZOMATO.NS', 
      'PAYTM.NS', 'NYKAA.NS', 'POLICYBZR.NS', 'DELHIVERY.NS', 'JINDALSTEL.NS', 
      'SAIL.NS', 'CANBK.NS', 'IDFCFIRSTB.NS', 'LUPIN.NS', 'AUROPHARMA.NS'
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
