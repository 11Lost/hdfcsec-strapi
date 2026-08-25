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

          <div className="research-reports-panel">
            <h3 className="research-reports-title">Reports</h3>
            <div className="research-report-list">
              {[
                {
                  tags: ['Positive Impact', 'Institutional Report'],
                  text: 'HSIE Results Daily: Reliance Industries, UltraTech Cement, JSW Steel, Dixon Technologies, Havells India...',
                  date: '12 Jan 25',
                },
                {
                  tags: ['Positive Impact', 'Institutional Report'],
                  text: 'Reliance Resumes Russian Oil Imports via Compliant Routes, Maintains Jamnagar Refinery Operations',
                  date: '12 Jan 25',
                },
                {
                  tags: ['Positive Impact', 'Quarterly Results'],
                  text: 'HSIE Results Daily: Reliance Industries, UltraTech Cement, JSW Steel, Dixon Technologies...',
                  date: '12 Jan 25',
                },
                {
                  tags: ['Positive Impact', 'Institutional Report'],
                  text: 'Reliance Resumes Russian Oil Imports via Compliant Routes, Maintains Jamnagar Refinery Operations',
                  date: '12 Jan 25',
                },
              ].map((report, i) => (
                <div key={i} className="research-report-card">
                  <div className="research-report-tags">
                    {report.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`research-tag ${tag.includes('Positive') ? 'positive' : tag.includes('Institutional') ? 'institutional' : 'quarterly'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="research-report-text">{report.text}</p>
                  <span className="research-report-date">{report.date}</span>
                </div>
              ))}
            </div>
            <a href="#" className="research-view-more">
              View More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
