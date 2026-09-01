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
            <thead className="peer-thead">
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
            <tbody id="peerTableBody">
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td className="peer-td peer-company-name">Reliance Industries</td>
                <td className="peer-td">210</td>
                <td className="peer-td">
                  ₹163.88 <span style={{ color: '#10B981', marginLeft: '4px', fontSize: '14px' }}>( <span style={{fontSize: '10px'}}>▲</span> 7.12% )</span>
                </td>
                <td className="peer-td">8.94</td>
                <td className="peer-td" style={{ textAlign: 'right' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', color: '#374151' }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td className="peer-td peer-company-name">Indian Oil Corporation</td>
                <td className="peer-td">540</td>
                <td className="peer-td">
                  ₹512.72 <span style={{ color: '#EF4444', marginLeft: '4px', fontSize: '14px' }}>( — 3.25% )</span>
                </td>
                <td className="peer-td">2.12</td>
                <td className="peer-td" style={{ textAlign: 'right' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', color: '#374151' }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F3F4F6', backgroundColor: '#F8FAFC' }}>
                <td className="peer-td peer-company-name">BSNL</td>
                <td className="peer-td">520</td>
                <td className="peer-td">
                  ₹501.05 <span style={{ color: '#EF4444', marginLeft: '4px', fontSize: '14px' }}>( — 1.53% )</span>
                </td>
                <td className="peer-td">4.50</td>
                <td className="peer-td" style={{ textAlign: 'right' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', color: '#374151' }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td className="peer-td peer-company-name">HPCL</td>
                <td className="peer-td">450</td>
                <td className="peer-td">
                  ₹421.72 <span style={{ color: '#EF4444', marginLeft: '4px', fontSize: '14px' }}>( — 2.09% )</span>
                </td>
                <td className="peer-td">3.60</td>
                <td className="peer-td" style={{ textAlign: 'right' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', color: '#374151' }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </td>
              </tr>
              <tr>
                <td className="peer-td peer-company-name">MRPL</td>
                <td className="peer-td">220</td>
                <td className="peer-td">
                  ₹211.50 <span style={{ color: '#EF4444', marginLeft: '4px', fontSize: '14px' }}>( — 1.10% )</span>
                </td>
                <td className="peer-td">10.15</td>
                <td className="peer-td" style={{ textAlign: 'right' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', color: '#374151' }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </td>
              </tr>
            </tbody>
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
