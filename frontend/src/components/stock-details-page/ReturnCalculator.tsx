'use client';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ReturnCalculator({ data }: { data?: any }) {
  const [mode, setMode] = useState<'SIP' | 'LUMPSUM'>('SIP');
  const [amount, setAmount] = useState<number>(1650);
  const [period, setPeriod] = useState<number>(5); // years
  
  const [searchQuery, setSearchQuery] = useState<string>(data?.Name || 'Reliance');
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('RELIANCE.NS');

  const [debouncedAmount, setDebouncedAmount] = useState(amount);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    invested: number;
    totalValue: number;
    profit: number;
    profitRate: string;
    cagr: string;
    name?: string;
    yearlyData?: { label: string; invested: number; value: number }[];
  } | null>(null);

  const [searchResults, setSearchResults] = useState<{symbol: string, name: string, exchange: string}[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Debounce inputs to prevent API spam
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setDebouncedAmount(amount);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery, amount]);

  // Fetch autocomplete suggestions
  useEffect(() => {
    let active = true;
    const fetchSearch = async () => {
      if (!debouncedSearch.trim() || debouncedSearch === result?.name || debouncedSearch === 'Reliance') {
        if (active) setSearchResults([]);
        return;
      }
      try {
        const res = await fetch(`/api/stock-search?q=${encodeURIComponent(debouncedSearch)}`);
        const data = await res.json();
        if (active) {
          setSearchResults(data.results || []);
          setIsDropdownOpen(true);
        }
      } catch {
        if (active) setSearchResults([]);
      }
    };
    fetchSearch();
    return () => { active = false; };
  }, [debouncedSearch, result?.name]);

  // Fetch real historical data
  useEffect(() => {
    let active = true;
    const fetchHistory = async () => {
      if (!selectedSymbol) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/stock-history?q=${encodeURIComponent(
            selectedSymbol
          )}&period=${period}&amount=${debouncedAmount}&mode=${mode}`
        );
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to fetch');
        }
        const data = await res.json();
        if (active) {
          setResult(data);
          // Update the search query to show the full name when selected
          setSearchQuery(data.name);
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchHistory();
    return () => {
      active = false;
    };
  }, [selectedSymbol, debouncedAmount, period, mode]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = {
    labels: result?.yearlyData ? result.yearlyData.map((d) => d.label) : ['1Y'],
    datasets: [
      {
        label: 'Total Value',
        data: result?.yearlyData ? result.yearlyData.map((d) => d.value) : [0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Light blue fill
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        tension: 0.4, // Smooth curves
      },
      {
        label: 'Invested Amount',
        data: result?.yearlyData ? result.yearlyData.map((d) => d.invested) : [0],
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.5)', // Pink/red fill
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: '#f43f5e',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: import('chart.js').TooltipItem<'line'>) =>
            `${context.dataset.label}: ${formatCurrency(context.raw as number)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
          callback: (val: string | number) => {
            const value = Number(val);
            if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
            if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
            if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
            return `₹${value}`;
          },
        },
      },
    },
  };

  return (
    <section id="return-calculator" className="sip-section">
      <div className="container">
        <div className="sip-header">
          <div className="sip-header-left">
            <h2 className="sip-title">
              Return <span>Calculator</span>{' '}
              <svg
                className="sip-info-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                style={{ verticalAlign: 'middle', marginLeft: 8 }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </h2>
            <p className="sip-subtitle">
              Project your potential returns on a chosen stock with ease.
            </p>
          </div>
          <div className="sip-toggle">
            <button
              className={`sip-toggle-btn ${mode === 'SIP' ? 'active' : ''}`}
              onClick={() => {
                setMode('SIP');
                setAmount(1650);
              }}
            >
              SIP
            </button>
            <button
              className={`sip-toggle-btn ${mode === 'LUMPSUM' ? 'active' : ''}`}
              onClick={() => {
                setMode('LUMPSUM');
                setAmount(100000);
              }}
            >
              LUMPSUM
            </button>
          </div>
        </div>

        <div className="sip-calculator">
          <div className="sip-input-panel">
            <div className="sip-input-label">Stock or Scheme</div>
            <div className="sip-search-wrapper" style={{ position: 'relative' }}>
              <svg
                className="sip-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="sip-search"
                placeholder="Search any stock, MF, F&O"
                value={searchQuery}
                onFocus={() => { if (searchResults.length > 0) setIsDropdownOpen(true); }}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {isDropdownOpen && searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  borderRadius: '0.375rem',
                  marginTop: '0.25rem',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 10,
                  border: '1px solid #e5e7eb'
                }}>
                  {searchResults.map((item) => (
                    <div
                      key={item.symbol}
                      onClick={() => {
                        setSelectedSymbol(item.symbol);
                        setSearchQuery(item.name);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: '0.5rem 0.75rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f3f4f6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#111827' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.symbol}</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>
                        {item.exchange}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sip-amount-header">
              <div className="sip-input-label">
                {mode === 'SIP'
                  ? 'Your Monthly Investment Amount'
                  : 'Your Lumpsum Investment Amount'}
              </div>
              <div className="sip-amount-value">{formatCurrency(amount)}</div>
            </div>
            <div className="sip-slider-wrapper">
              <input
                type="range"
                className="sip-slider"
                min={mode === 'SIP' ? 100 : 500}
                max={mode === 'SIP' ? 100000 : 10000000}
                value={amount}
                step={mode === 'SIP' ? 100 : 1000}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="sip-slider-labels">
              <span className="sip-slider-label">
                {mode === 'SIP' ? '₹ 100' : '₹ 500'}
              </span>
              <span className="sip-slider-label">
                {mode === 'SIP' ? '₹ 1 Lakh' : '₹ 10Cr'}
              </span>
            </div>

            <div className="sip-period">
              <div className="sip-period-label">Period</div>
              <div className="sip-period-buttons">
                {[1, 3, 5, 10, 15, 20].map((p) => (
                  <button
                    key={p}
                    className={`sip-period-btn ${period === p ? 'active' : ''}`}
                    onClick={() => setPeriod(p)}
                  >
                    {p}Y
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sip-result-panel">
            <div
              className="sip-chart-container"
              style={{ position: 'relative', width: '100%', height: '300px', margin: '0 auto' }}
            >
              <Line data={chartData} options={chartOptions} />
              {loading && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '4px' }}>
                  Loading...
                </div>
              )}
            </div>
            <div className="sip-result-cards">
              <div className="sip-profit-card">
                <div className="sip-profit-label">
                  Your Profit{' '}
                  {result && <span>({result.profitRate}%)</span>}
                </div>
                <div className="sip-profit-value">
                  {error ? (
                    <span style={{ color: 'red', fontSize: '14px' }}>{error}</span>
                  ) : result ? (
                    formatCurrency(result.profit)
                  ) : (
                    '...'
                  )}
                </div>
              </div>
              <div className="sip-summary-card">
                <div className="sip-summary-title">
                  Investment Summary ({period} Years)
                  {result?.name && <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{result.name} (CAGR: {result.cagr}%)</div>}
                </div>
                <div className="sip-summary-row">
                  <div className="sip-summary-label">
                    <span className="sip-summary-dot total" />
                    Total Value
                  </div>
                  <div className="sip-summary-amount">
                    {result ? formatCurrency(result.totalValue) : '...'}
                  </div>
                </div>
                <div className="sip-summary-row">
                  <div className="sip-summary-label">
                    <span className="sip-summary-dot invested" />
                    Investment
                  </div>
                  <div className="sip-summary-amount">
                    {result ? formatCurrency(result.invested) : '...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sip-disclaimer">
          <strong>Disclaimer:</strong> The calculations shown here are based on actual historical prices for the selected asset over the specified period. Values may vary; Please consult your advisor. Past performance does not guarantee future returns.
        </div>
      </div>
    </section>
  );
}
