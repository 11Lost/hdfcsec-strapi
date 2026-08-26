'use client';

export default function Overview({ data }: { data?: any }) {
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
                    <span>Quanity</span>
                  </div>
                  {[20, 35, 15, 30, 50].map((w, i) => (
                    <div key={i} className="market-depth-row">
                      <span className="market-depth-price">1453.93</span>
                      <span className="market-depth-qty bid">
                        {i === 1 ? '5' : ''}
                      </span>
                      <div
                        className="market-depth-bar bid"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                  ))}
                  <div className="market-depth-total">
                    <span>Bid Total</span>
                    <span>483</span>
                  </div>
                </div>
                <div className="market-depth-table">
                  <div className="market-depth-header">
                    <span>Ask Price</span>
                    <span>Quanity</span>
                  </div>
                  {[25, 40, 20, 35, 55].map((w, i) => (
                    <div key={i} className="market-depth-row">
                      <span className="market-depth-price">1453.93</span>
                      <span className="market-depth-qty ask">
                        {i === 1 ? '5' : ''}
                      </span>
                      <div
                        className="market-depth-bar ask"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                  ))}
                  <div className="market-depth-total">
                    <span>Ask Price</span>
                    <span>483</span>
                  </div>
                </div>
              </div>
              <div className="order-quantity-bar">
                <div className="order-qty-header">
                  <span className="order-qty-label">Buy Order Quantity</span>
                  <span className="order-qty-label">Sell Order Quantity</span>
                </div>
                <div className="order-qty-percentage">
                  <span className="order-qty-percent">43%</span>
                  <span className="order-qty-percent">57%</span>
                </div>
                <div className="order-qty-progress">
                  <div className="order-qty-fill" style={{ width: '43%' }} />
                </div>
              </div>
            </div>

            <div className="overview-card">
              <h3 className="overview-card-title">
                Finance
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </h3>
              <div className="finance-tabs">
                <button className="finance-tab active" data-tab="turnover">
                  Turnover
                </button>
                <button className="finance-tab" data-tab="profit">
                  Profit
                </button>
                <button className="finance-tab" data-tab="networth">
                  Networth
                </button>
              </div>
              <div className="finance-chart-container">
                <canvas id="financeChart" />
              </div>
              <div className="finance-controls">
                <div className="finance-toggle">
                  <button className="finance-toggle-btn" data-period="quarterly">
                    Quarterly
                  </button>
                  <button
                    className="finance-toggle-btn active"
                    data-period="yearly"
                  >
                    Yearly
                  </button>
                </div>
                <a href="#" className="finance-see-all">
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
