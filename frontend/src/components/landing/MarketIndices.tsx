'use client';

import { useState, useEffect, useCallback } from 'react';

interface IndexData {
  indexSymbol?: string;
  index?: string;
  last?: string;
  variation?: string;
  percentChange?: string;
}

const ALLOWED_INDICES = [
  'NIFTY 50',
  'NIFTY NEXT 50',
  'NIFTY FINANCIAL SERVICES',
  'NIFTY BANK',
  'NIFTY MIDCAP 100',
  'NIFTY SMALLCAP 100',
  'NIFTY AUTO',
  'NIFTY FMCG',
];

const UP_SVG = (
  <svg className="change-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 7l-9.2 9.2M7 7v10h10" />
  </svg>
);

const DOWN_SVG = (
  <svg className="change-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

function formatNum(val: string | number): string {
  const n = parseFloat(String(val).replace(/,/g, ''));
  if (isNaN(n)) return String(val);
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function MarketIndices() {
  const [indices, setIndices] = useState<IndexData[]>([]);

  const fetchIndices = useCallback(async () => {
    try {
      const res = await fetch('/api/nse-indices');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const data = json.data || [];
      const results = ALLOWED_INDICES.map((name) =>
        data.find(
          (idx: IndexData) =>
            idx.indexSymbol === name || idx.index === name
        )
      ).filter(Boolean);
      if (results.length > 0) setIndices(results);
    } catch (err) {
      console.warn('[MarketIndices] Fetch failed:', err);
    }
  }, []);

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 30000);
    return () => clearInterval(interval);
  }, [fetchIndices]);

  return (
    <div className="market-grid">
      {indices.map((idx, i) => {
        const name = idx.indexSymbol ?? idx.index ?? '—';
        const ltp = idx.last ?? '0';
        const net = idx.variation ?? '0';
        const pct = parseFloat(String(idx.percentChange ?? '0'));
        const isPos = pct >= 0;
        const dir = isPos ? 'positive' : 'negative';
        const arrow = isPos ? UP_SVG : DOWN_SVG;
        const sign = isPos ? '+' : '';
        const netFmt = formatNum(Math.abs(parseFloat(String(net))));
        const pctFmt = Math.abs(pct).toFixed(2);

        return (
          <div key={i} className="market-item">
            <div className="market-name">{name}</div>
            <div className="market-value">{formatNum(ltp)}</div>
            <div className={`market-change ${dir}`}>
              {arrow}
              <span>
                {sign}
                {netFmt} ({sign}
                {pctFmt}%)
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
