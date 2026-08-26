'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const chartLabels = ['09:15', '09:45', '10:15', '10:45', '11:15', '11:45', '12:15', '12:45', '13:15', '13:45', '14:15'];
const chartDataValues = [1480, 1460, 1520, 1490, 1400, 1460, 1550, 1480, 1440, 1470, 1370, 1420, 1380, 1410, 1470, 1420, 1360, 1460, 1430];

const data = {
  labels: chartLabels,
  datasets: [
    {
      fill: true,
      data: chartDataValues,
      borderColor: '#1E3A8A',
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(30, 58, 138, 0.2)');
        gradient.addColorStop(1, 'rgba(30, 58, 138, 0)');
        return gradient;
      },
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#1E3A8A',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#374151',
      bodyColor: '#1E3A8A',
      bodyFont: { weight: 'bold', size: 16 },
      borderColor: '#E5E7EB',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function (context: any) {
          return '₹' + context.parsed.y.toFixed(2);
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#64748B', maxTicksLimit: 7 }
    },
    y: {
      border: { dash: [4, 4] },
      grid: {
        color: '#F1F5F9',
        tickLength: 0,
      },
      ticks: { color: '#64748B', stepSize: 50 },
      min: 1300,
    }
  }
};

export default function StockOverview() {
  return (
    <section className="stock-overview-section">
      <div className="container">
        <div className="stock-overview-content">
          {/* Left Column */}
          <div className="stock-overview-left" style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
            <div className="stock-chart-panel" style={{ backgroundColor: 'white' }}>
              <div className="stock-chart-label">Price (₹)</div>
              <div
                className="stock-chart-container"
                id="tvChartContainer"
                style={{ height: 350, minHeight: 320, width: '100%', position: 'relative' }}
              >
                <Line data={data} />
              </div>

              <div className="stock-time-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px dashed #E5E7EB', paddingTop: '16px' }}>
                <div className="stock-exchange-toggle" style={{ display: 'flex', gap: '8px' }}>
                  <button className="stock-exchange-btn" style={{ background: '#E0E7FF', padding: '6px 20px', borderRadius: '20px', fontWeight: 'bold', color: '#1E3A8A', border: 'none', cursor: 'pointer' }}>NSE</button>
                </div>
                <div className="stock-time-btns" style={{ display: 'flex', background: '#F1F5F9', borderRadius: '20px', padding: '4px', border: '1px solid #E5E7EB' }}>
                  {['1D', '1W', '1M', '1Y', '3Y', '5Y', 'All'].map(t => (
                    <button key={t} style={{ padding: '6px 16px', borderRadius: '16px', background: t === '1D' ? '#1E3A8A' : 'transparent', color: t === '1D' ? 'white' : '#64748B', fontWeight: '600', fontSize: '13px', border: 'none', cursor: 'pointer' }}>{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="stock-mtf-banner" style={{ margin: 0 }}>
              <div className="stock-mtf-left">
                <div className="stock-mtf-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="stock-mtf-text">
                  <div className="stock-mtf-title">Low on Funds?</div>
                  <div className="stock-mtf-desc">
                    Invest now with MTF with a leverage of 4.55x and Begin your investment journey now!
                  </div>
                </div>
              </div>
              <button className="stock-mtf-btn">Buy with MTF</button>
            </div>
          </div>

          {/* Right Column */}
          <div className="stock-overview-right" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 300 }}>
            <div className="stock-card" style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px', background: 'white' }}>
              <h3 className="stock-card-title" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Performance
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </h3>

              <div className="stock-range-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                <span>Today's Low<br /><strong style={{ color: '#DC2626', fontSize: '14px' }}>1,531.00</strong></span>
                <span style={{ textAlign: 'right' }}>Today's High<br /><strong style={{ color: '#16A34A', fontSize: '14px' }}>1,541.00</strong></span>
              </div>
              <div className="stock-range-bar" style={{ height: '6px', background: 'linear-gradient(to right, #EF4444, #F59E0B, #22C55E)', borderRadius: '3px', position: 'relative', marginBottom: '24px' }}>
                <div className="stock-range-indicator" style={{ position: 'absolute', left: '70%', top: '50%', transform: 'translate(-50%, -50%)', width: '0', height: '0', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '6px solid black' }} />
              </div>

              <div className="stock-range-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                <span>52W Low<br /><strong style={{ color: '#DC2626', fontSize: '14px' }}>1,141.00</strong></span>
                <span style={{ textAlign: 'right' }}>52W High<br /><strong style={{ color: '#16A34A', fontSize: '14px' }}>1,581.00</strong></span>
              </div>
              <div className="stock-range-bar" style={{ height: '6px', background: 'linear-gradient(to right, #EF4444, #F59E0B, #22C55E)', borderRadius: '3px', position: 'relative', marginBottom: '24px' }}>
                <div className="stock-range-indicator" style={{ position: 'absolute', left: '82%', top: '50%', transform: 'translate(-50%, -50%)', width: '0', height: '0', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '6px solid black' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '24px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                <div><div style={{ fontSize: '12px', color: '#64748B' }}>Open</div><div style={{ fontWeight: 'bold' }}>1,141.00</div></div>
                <div><div style={{ fontSize: '12px', color: '#64748B' }}>Prev. Close</div><div style={{ fontWeight: 'bold' }}>1,141.00</div></div>
                <div><div style={{ fontSize: '12px', color: '#64748B' }}>Volume</div><div style={{ fontWeight: 'bold' }}>10,10,679</div></div>
                <div><div style={{ fontSize: '12px', color: '#64748B' }}>Lower Circuit</div><div style={{ fontWeight: 'bold' }}>1346.00</div></div>
                <div><div style={{ fontSize: '12px', color: '#64748B' }}>Upper Circuit</div><div style={{ fontWeight: 'bold' }}>1,639.00</div></div>
                <div><div style={{ fontSize: '12px', color: '#64748B' }}>Total Traded Value</div><div style={{ fontWeight: 'bold' }}>15 Cr</div></div>
              </div>
            </div>

            <div className="stock-card" style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px', background: 'white' }}>
              <h3 className="stock-card-title" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Fundamentals
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </h3>
              <div className="stock-fund-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  ['Market Cap', '11,25,123 Cr'],
                  ['P/E Ratio', '21.00'],
                  ['P/B Ratio', '2.38'],
                  ['Book Value', '648.28'],
                  ['Industry P/E', '2.38'],
                  ['Debt to Equity', '0.43'],
                  ['ROE', '9.47%'],
                  ['', ''],
                  ['EPS(TTM)', '71.99'],
                  ['Dividend Yield', '0.36%'],
                  ['Face Value', '10'],
                ].map(([label, value], idx) => label ? (
                  <div key={idx} className="stock-fund-item">
                    <div className="stock-fund-label" style={{ fontSize: '12px', color: '#64748B' }}>{label}</div>
                    <div className="stock-fund-value" style={{ fontWeight: 'bold', fontSize: '13px' }}>{value}</div>
                  </div>
                ) : <div key={idx} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
