'use client';

export default function StockOverview() {
  return (
    <section className="stock-overview-section">
      <div className="container">
        <div className="stock-overview-content">
          <div className="stock-chart-panel">
            <div className="stock-chart-label">Price (₹)</div>
            <div
              className="stock-chart-container"
              id="tvChartContainer"
              style={{ height: 420, minHeight: 320 }}
            />
          </div>

          <div className="stock-info-panel">
            <div className="stock-card">
              <h3 className="stock-card-title">
                Performance
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </h3>
              <p id="dyn-fo-name" className="fo-stock-name">
                Reliance Industries
              </p>
              <div className="fo-price-row">
                <span id="dyn-fo-price" className="fo-price">
                  1,566.49
                </span>
                <span id="dyn-fo-change" className="fo-change positive">
                  +26.08(1.4%)
                </span>
              </div>
              <div className="stock-range-row">
                <div className="fo-range-values">
                  <span id="dyn-fo-low" className="fo-range-value low">
                    1,531.00
                  </span>
                  <span id="dyn-fo-high" className="fo-range-value high">
                    1,541.00
                  </span>
                </div>
              </div>
              <div className="stock-range-bar">
                <div className="stock-range-indicator" style={{ left: '70%' }} />
              </div>
              <div className="stock-range-row" style={{ marginTop: 16 }}>
                <span className="stock-range-label">52W Low</span>
                <span className="stock-range-label">52W High</span>
              </div>
              <div className="stock-range-row">
                <span id="dyn-perf-low" className="stock-range-value low">
                  1,141.00
                </span>
                <span className="stock-range-value high">1,581.00</span>
              </div>
              <div className="stock-range-bar stock-range-bar-52w">
                <div className="stock-range-indicator" style={{ left: '82%' }} />
              </div>
              <div className="stock-perf-item">
                <div className="stock-perf-label">Total Traded Value</div>
                <div className="stock-perf-value">15 Cr</div>
              </div>
            </div>
          </div>

          <div className="stock-card">
            <h3 className="stock-card-title">
              Fundamentals
              <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </h3>
            <div className="stock-fund-grid">
              {[
                ['Market Cap', '11,25,123 Cr'],
                ['P/E Ratio', '21.00'],
                ['P/B Ratio', '2.38'],
                ['Book Value', '648.28'],
                ['Industry P/E', '2.38'],
                ['Debt to Equity', '0.43'],
                ['ROE', '9.47%'],
                ['EPS(TTM)', '71.99'],
                ['Dividend Yield', '0.36%'],
                ['Face Value', '10'],
              ].map(([label, value]) => (
                <div key={label} className="stock-fund-item">
                  <div className="stock-fund-label">{label}</div>
                  <div className="stock-fund-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stock-mtf-banner">
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
                Invest now with MTF with a leverage of 4.55x and Begin your
                investment journey now!
              </div>
            </div>
          </div>
          <button className="stock-mtf-btn">Buy with MTF</button>
        </div>
      </div>
    </section>
  );
}
