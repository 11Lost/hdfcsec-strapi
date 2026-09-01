'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Stock {
  F_NAME?: string;
  S_NAME?: string;
  LTP?: string;
  PER_CHANGE?: string;
}



function formatPrice(val: string | undefined): string {
  const n = parseFloat(String(val || '0').replace(/,/g, ''));
  if (isNaN(n)) return String(val || '—');
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default function Ticker({ initialData = [] }: { initialData?: any[] }) {
  const [currentFilter, setCurrentFilter] = useState<string>('positive');
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [sectors, setSectors] = useState<Stock[]>([]);
  
  const tickerRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/ticker-stocks');
      const json = await res.json();
      const dataStocks = json.data || [];

      const topGainers = [...dataStocks]
        .filter((idx: any) => idx.percentChange > 0)
        .sort((a: any, b: any) => b.percentChange - a.percentChange)
        .slice(0, 10)
        .map((idx: any) => ({
          F_NAME: idx.indexSymbol,
          LTP: String(idx.last),
          PER_CHANGE: String(idx.percentChange),
        }));

      const topLosers = [...dataStocks]
        .filter((idx: any) => idx.percentChange < 0)
        .sort((a: any, b: any) => a.percentChange - b.percentChange)
        .slice(0, 10)
        .map((idx: any) => ({
          F_NAME: idx.indexSymbol,
          LTP: String(idx.last),
          PER_CHANGE: String(idx.percentChange),
        }));

      // Show some key stocks in the 'Sectors' tab as requested
      const keyStocks = dataStocks
        .filter((idx: any) => ['MRF', 'AXISBANK', 'IDBI', 'RELIANCE', 'HDFCBANK', 'INFY'].some(sym => idx.indexSymbol?.includes(sym)))
        .map((idx: any) => ({
          F_NAME: idx.indexSymbol,
          LTP: String(idx.last),
          PER_CHANGE: String(idx.percentChange),
        }));

      setGainers(topGainers);
      setLosers(topLosers);
      setSectors(keyStocks.length > 0 ? keyStocks : topGainers);
    } catch (err) {
      console.warn('[Ticker] Fetch failed:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const getStocks = (): Stock[] => {
    if (currentFilter === 'positive') return gainers;
    if (currentFilter === 'negative') return losers;
    if (currentFilter === 'sectors') return sectors;
    return gainers;
  };

  const stocks = getStocks();

  const buildTickerItem = (stock: Stock, idx: number) => {
    const name = stock.F_NAME ?? stock.S_NAME ?? '—';
    const price = stock.LTP ?? '—';
    const pctRaw = parseFloat(String(stock.PER_CHANGE || '0'));
    const isPos = pctRaw >= 0;
    const sign = isPos ? '+' : '';
    const cssClass = isPos ? 'positive' : 'negative';
    const imgSrc = isPos ? '/images/positive.svg' : '/images/negative.svg';
    const imgAlt = isPos ? 'Sparkline Positive' : 'Sparkline Negative';

    return (
      <div
        key={idx}
        className={`ticker-item ${cssClass}`}
        data-direction={cssClass}
      >
        <div>
          <div className="ticker-stock-name">{escapeHtml(name)}</div>
          <div className="ticker-price">{formatPrice(price)}</div>
        </div>
        <div className="ticker-sparkline">
          <img src={imgSrc} alt={imgAlt} />
        </div>
        <div className="ticker-change">
          {sign}
          {pctRaw.toFixed(2)}%
        </div>
      </div>
    );
  };

  return (
    <div className="ticker-section">
      <div className="container">
        <div className="ticker-tabs">
          <button
            className={`ticker-tab ${currentFilter === 'positive' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('positive')}
          >
            Top Gainers
          </button>
          <button
            className={`ticker-tab ${currentFilter === 'negative' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('negative')}
          >
            Top Losers
          </button>
          <button
            className={`ticker-tab ${currentFilter === 'sectors' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('sectors')}
          >
            Sectors
          </button>
        </div>
      </div>
      <div className="ticker-wrapper">
        <div ref={tickerRef} className="ticker-content">
          {stocks.length === 0 ? (
            <div className="ticker-item" style={{ opacity: 0.5, padding: '0 1rem' }}>
              Loading…
            </div>
          ) : (
            <>
              {stocks.map((s, i) => buildTickerItem(s, i))}
              {stocks.map((s, i) => buildTickerItem(s, i + stocks.length))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
