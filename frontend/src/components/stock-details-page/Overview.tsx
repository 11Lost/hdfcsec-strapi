'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

const financeData = {
  labels: ['2021', '2022', '2023', '2024', '2025'],
  datasets: [
    {
      data: [435678, 335671, 225674, 325681, 300432],
      backgroundColor: '#93C5FD',
      borderRadius: 8,
      barThickness: 12,
      borderSkipped: false,
    }
  ]
};

const financeOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      right: 80
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: {
      grid: {
        color: '#E2E8F0',
        drawBorder: false,
        tickLength: 0,
      },
      border: { dash: [4, 4], display: false },
      ticks: { display: false },
      max: 500000
    },
    y: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#64748B', padding: 16, font: { size: 12 } },
      border: { display: false }
    }
  }
};

const valuePlugin = {
  id: 'valuePlugin',
  afterDatasetsDraw(chart: any) {
    const { ctx, data, chartArea: { right } } = chart;
    ctx.save();
    chart.getDatasetMeta(0).data.forEach((datapoint: any, index: number) => {
      const value = data.datasets[0].data[index];
      const formattedValue = new Intl.NumberFormat('en-IN').format(value);
      ctx.font = '13px Inter, sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(formattedValue, datapoint.x + 12, datapoint.y);
    });
    ctx.restore();
  }
};

export default function Overview({ data }: { data?: any }) {
  const [marketData, setMarketData] = useState({
      bids: [
      { price: 1449.15, quantity: 250, width: 80 },
      { price: 1449.10, quantity: 150, width: 50 },
      { price: 1449.05, quantity: 80, width: 30 },
      { price: 1449.00, quantity: 120, width: 45 },
      { price: 1448.95, quantity: 60, width: 25 },
    ],
    asks: [
      { price: 1450.00, quantity: 180, width: 60 },
      { price: 1450.05, quantity: 90, width: 40 },
      { price: 1450.10, quantity: 140, width: 55 },
      { price: 1450.15, quantity: 70, width: 25 },
      { price: 1450.20, quantity: 110, width: 45 },
    ],
    bidTotal: 660,
    askTotal: 590,
    buyPercent: 55,
  });
  return (
    <section id="overview" className="overview-section">
      <div className="container">
        <h2 className="overview-title">Overview</h2>
        <div className="overview-grid">
          <div className="overview-left">
            <div className="overview-card">
              <h3 className="overview-card-title">
                Market Depth
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </h3>
              <div className="market-depth-tables">
                <div className="market-depth-table">
                  <div className="market-depth-header">
                    <span>Bid Price</span>
                    <span>Quantity</span>
                  </div>
                  {marketData.bids.map((row, i) => (
                    <div key={i} className="market-depth-row">
                      <span className="market-depth-price">{row.price.toFixed(2)}</span>
                      <span className="market-depth-qty bid">
                        {row.quantity}
                      </span>
                      <div
                        className="market-depth-bar bid"
                        style={{ width: `${row.width}%` }}
                      />
                    </div>
                  ))}
                  <div className="market-depth-total">
                    <span>Bid Total</span>
                    <span>{marketData.bidTotal}</span>
                  </div>
                </div>
                <div className="market-depth-table">
                  <div className="market-depth-header">
                    <span>Ask Price</span>
                    <span>Quantity</span>
                  </div>
                  {marketData.asks.map((row, i) => (
                    <div key={i} className="market-depth-row">
                      <span className="market-depth-price">{row.price.toFixed(2)}</span>
                      <span className="market-depth-qty ask">
                        {row.quantity}
                      </span>
                      <div
                        className="market-depth-bar ask"
                        style={{ width: `${row.width}%` }}
                      />
                    </div>
                  ))}
                  <div className="market-depth-total">
                    <span>Ask Total</span>
                    <span>{marketData.askTotal}</span>
                  </div>
                </div>
              </div>
              <div className="order-quantity-bar">
                <div className="order-qty-header">
                  <span className="order-qty-label">Buy Order Quantity</span>
                  <span className="order-qty-label">Sell Order Quantity</span>
                </div>
                <div className="order-qty-percentage">
                  <span className="order-qty-percent">{marketData.buyPercent}%</span>
                  <span className="order-qty-percent">{100 - marketData.buyPercent}%</span>
                </div>
                <div className="order-qty-progress">
                  <div className="order-qty-fill" style={{ width: `${marketData.buyPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="overview-card" style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px', background: 'white'}}>
              <h3 className="overview-card-title" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
                Finance
                <svg className="info-icon" viewBox="0 0 24 24" fill="#1E3A8A" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" stroke="white" strokeWidth="2" />
                  <path d="M12 8h.01" stroke="white" strokeWidth="2" />
                </svg>
              </h3>
              <div className="finance-tabs" style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #E5E7EB', marginBottom: '0' }}>
                <button className="finance-tab active" style={{ color: '#1E3A8A', fontWeight: 'bold', borderBottom: '2px solid #1E3A8A', paddingBottom: '12px', background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', fontSize: '14px' }}>
                  Turnover
                </button>
                <button className="finance-tab" style={{ color: '#64748B', paddingBottom: '12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                  Profit
                </button>
                <button className="finance-tab" style={{ color: '#64748B', paddingBottom: '12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                  Networth
                </button>
              </div>
              <div className="finance-chart-container" style={{ height: '240px', width: '100%', position: 'relative' }}>
                <Bar data={financeData} options={financeOptions} plugins={[valuePlugin]} />
              </div>
              <div className="finance-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0' }}>
                <div className="finance-toggle" style={{ display: 'flex', gap: '8px' }}>
                  <button className="finance-toggle-btn" style={{ padding: '6px 16px', borderRadius: '20px', background: '#F1F5F9', color: '#94A3B8', border: 'none', fontSize: '13px', cursor: 'pointer' }}>
                    Quarterly
                  </button>
                  <button className="finance-toggle-btn active" style={{ padding: '6px 16px', borderRadius: '20px', background: '#DBEAFE', color: '#1E3A8A', border: 'none', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>
                    Yearly
                  </button>
                </div>
                <a href="#" className="finance-see-all" style={{ color: '#EF4444', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                  See All
                </a>
              </div>
            </div>
          </div>

          <div className="overview-right">
            <div className="overview-card" id="StockAdvice" dangerouslySetInnerHTML={data?.StockAdvice ? { __html: data.StockAdvice } : undefined} />
            <div className="overview-card" id="RiskOverview" dangerouslySetInnerHTML={data?.RiskOverview ? { __html: data.RiskOverview } : undefined} />
            <div className="overview-card" id="FandO" dangerouslySetInnerHTML={data?.FandO ? { __html: data.FandO } : undefined} />
          </div>
        </div>
      </div>
    </section>
  );
}
