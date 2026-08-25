'use client';

export default function PeerComparison() {
  return (
    <section id="peer-comparison" className="peer-section">
      <div className="container">
        <div className="peer-header">
          <div className="peer-header-left">
            <h2 className="peer-title">
              Peer <span>Comparison</span>
            </h2>
            <p className="peer-subtitle">
              A quick glance on how stocks from the same sector have performed
              along with some key parameters.
            </p>
          </div>
          <div className="peer-toggle">
            <button className="peer-toggle-btn active" id="chartViewBtn">
              Chart View
            </button>
            <button className="peer-toggle-btn" id="listViewBtn">
              List View
            </button>
          </div>
        </div>

        <div className="peer-table-container" id="peerTableContainer">
          <table className="peer-table">
            <thead>
              <tr>
                <th className="peer-th peer-th-company">Company</th>
                <th className="peer-th peer-th-sortable" data-sort="52weeks">
                  52 weeks <span className="peer-sort-icon">⇅</span>
                </th>
                <th className="peer-th peer-th-price">Market Price</th>
                <th className="peer-th peer-th-sortable" data-sort="pe">
                  P/E Ratio <span className="peer-sort-icon">⇅</span>
                </th>
                <th className="peer-th peer-th-action" />
              </tr>
            </thead>
            <tbody id="peerTableBody" />
          </table>
        </div>

        <div
          className="peer-chart-container"
          id="peerChartContainer"
          style={{ display: 'none' }}
        >
          <canvas id="peerChart" />
        </div>
      </div>
    </section>
  );
}
