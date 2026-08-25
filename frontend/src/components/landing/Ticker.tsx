'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Stock {
  F_NAME?: string;
  S_NAME?: string;
  LTP?: string;
  PER_CHANGE?: string;
}

const API_BASE = 'https://www.hdfcsec.com/api/EquityAPI';

const LOSERS_BODY = new URLSearchParams({
  Method: 'BI_GAINLOSER',
  'param[0][Key]': 'p_rcdcnt',
  'param[0][Value]': '10',
  'param[1][Key]': 'p_exchange',
  'param[1][Value]': 'NSE',
  'param[2][Key]': 'p_fname',
  'param[2][Value]': 'L',
  'param[3][Key]': 'p_index',
  'param[3][Value]': '20559',
  'param[4][Key]': 'p_pagesize',
  'param[4][Value]': '10',
  'param[5][Key]': 'p_pagenumber',
  'param[5][Value]': '1',
}).toString();

const GAINERS_BODY = new URLSearchParams({
  Method: 'BI_GAINLOSER',
  'param[0][Key]': 'p_rcdcnt',
  'param[0][Value]': '5',
  'param[1][Key]': 'p_exchange',
  'param[1][Value]': 'NSE',
  'param[2][Key]': 'p_fname',
  'param[2][Value]': 'G',
  'param[3][Key]': 'p_index',
  'param[3][Value]': '20559',
  'param[4][Key]': 'p_pagesize',
  'param[4][Value]': '20',
  'param[5][Key]': 'p_pagenumber',
  'param[5][Value]': '1',
}).toString();

async function postJson(apiUrl: string, body: string): Promise<{ data: Stock[] }[]> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      Accept: '*/*',
    },
    body,
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const json = await response.json();
  const raw = json?.data ?? json?.Data ?? json;
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  return Array.isArray(parsed) ? parsed : [];
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

export default function Ticker() {
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      const [gainersRes, losersRes] = await Promise.allSettled([
        postJson(`${API_BASE}/GetMarketTypeGainerData`, GAINERS_BODY),
        postJson(`${API_BASE}/GetlooserData`, LOSERS_BODY),
      ]);
      if (gainersRes.status === 'fulfilled' && gainersRes.value.length > 0) {
        setGainers(gainersRes.value[0]?.data || []);
      }
      if (losersRes.status === 'fulfilled' && losersRes.value.length > 0) {
        setLosers(losersRes.value[0]?.data || []);
      }
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
    return [...gainers, ...losers];
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
            className={`ticker-tab ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('all')}
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
