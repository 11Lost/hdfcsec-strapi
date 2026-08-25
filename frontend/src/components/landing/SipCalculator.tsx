'use client';

export default function SipCalculator() {
  return (
    <section className="sip-section">
      <div className="container">
        <div className="sip-header">
          <div id="sipHeaderLeft" className="sip-header-left">
            <h2 className="sip-title">
              Understand <span>Before You Invest</span>
            </h2>
            <p className="sip-subtitle">
              Use this tool to understand future returns.
            </p>
          </div>
          <div className="sip-toggle">
            <button className="sip-toggle-btn active" id="sipBtn">
              SIP
            </button>
            <button className="sip-toggle-btn" id="lumpsumBtn">
              LUMPSUM
            </button>
          </div>
        </div>

        <div className="sip-calculator">
          <div className="sip-input-panel">
            <div className="sip-input-label">Stock or Scheme</div>
            <div className="sip-search-wrapper">
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
                placeholder="Search any stock, MF, F&O (E.g: HDFC Bank)"
              />
            </div>

            <div className="sip-amount-header">
              <div className="sip-input-label">
                Your Monthly Investment Amount
              </div>
              <div className="sip-amount-value" id="sipAmountValue">
                ₹ 1,650
              </div>
            </div>
            <div className="sip-slider-wrapper">
              <input
                type="range"
                className="sip-slider"
                id="sipAmountSlider"
                min={100}
                max={10000000}
                defaultValue={1650}
                step={100}
              />
            </div>
            <div className="sip-slider-labels">
              <span className="sip-slider-label">₹ 100</span>
              <span className="sip-slider-label">₹ 10Cr</span>
            </div>

            <div className="sip-period">
              <div className="sip-period-label">Period</div>
              <div className="sip-period-buttons">
                {['1D', '1W', '1M', '1Y', '3Y', '5Y'].map((p) => (
                  <button
                    key={p}
                    className={`sip-period-btn ${p === '5Y' ? 'active' : ''}`}
                    data-period={p}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sip-result-panel">
            <div className="sip-chart-container">
              <canvas id="sipChart" />
            </div>
            <div className="sip-result-cards">
              <div className="sip-profit-card">
                <div className="sip-profit-label">
                  Your Profit{' '}
                  <span id="sipProfitRate">(23.50%)</span>
                </div>
                <div className="sip-profit-value" id="sipProfitValue">
                  ₹ 71,740
                </div>
              </div>
              <div className="sip-summary-card">
                <div className="sip-summary-title" id="sipSummaryTitle">
                  Investment Summary (5 Years)
                </div>
                <div className="sip-summary-row">
                  <div className="sip-summary-label">
                    <span className="sip-summary-dot total" />
                    Total Value
                  </div>
                  <div className="sip-summary-amount" id="sipTotalValue">
                    ₹ 1,70,740
                  </div>
                </div>
                <div className="sip-summary-row">
                  <div className="sip-summary-label">
                    <span className="sip-summary-dot invested" />
                    Investment
                  </div>
                  <div className="sip-summary-amount" id="sipInvestedValue">
                    ₹ 99,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="sipDisclaimer" className="sip-disclaimer">
          <strong>Disclaimer:</strong> The calculations shown here are
          indicative and provided for reference purposes only. Values may
          vary; Please consult your advisor. Past performance does not
          guarantee future returns.
        </div>
      </div>
    </section>
  );
}
