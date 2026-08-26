'use client';

export default function Reports({ data }: { data?: any }) {
  return (
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
  );
}
