'use client';

export default function ResearchAnalysis() {
  return (
    <section id="research-analysis" className="research-section">
      <div className="container">
        <div className="research-header">
          <h2 className="research-title">
            Research <span>Analysis</span>
          </h2>
          <p className="research-subtitle">
            Professional research that explains how the company is performing
            and what experts expect in the future.
          </p>
        </div>

        <div className="research-content">
          <div className="research-chart-panel">
            <div className="research-chart-wrapper">
              <div className="research-chart-label">Price (₹)</div>
              <div className="research-chart-container">
                <canvas id="researchChart" />
              </div>
            </div>
            <div className="research-stats-bar">
              {[
                ['Current Market Price', '1548.50'],
                ['Target', '1850'],
                ['Stop loss', '1500'],
                ['Reco Price', '₹3110.30'],
                ['Reco Date', '29 Jul 2024'],
                ['Call Type', 'SIP'],
              ].map(([label, value]) => (
                <div key={label} className="research-stat">
                  <div className="research-stat-label">{label}</div>
                  <div
                    className={`research-stat-value ${label === 'Reco Price' ? 'highlight' : ''}`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
