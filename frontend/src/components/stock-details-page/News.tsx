'use client';

export default function News({ data }: { data?: any }) {
  return (
    <div className="company-news-card">
      <h3 className="company-news-title">
        News
      </h3>
      <div className="company-news-list">
        <div className="company-news-item">
          <p className="company-news-headline">
            Reliance Resumes Russian Oil Imports via Compliant Routes, Maintains Jamnagar Refinery Operations
          </p>
          <p>
            <span className="company-news-date">2 days ago</span>
          </p>
        </div>
        <div className="company-news-item">
          <p className="company-news-headline">
            Reliance Resumes Russian Oil Imports via Compliant Routes
          </p>
          <p>
            <span className="company-news-date">2 days ago</span>
          </p>
        </div>
        <div className="company-news-item">
          <p className="company-news-headline">
            Reliance Resumes Russian Oil Imports via Compliant Routes, Maintains Jamnagar
          </p>
          <p>
            <span className="company-news-date">4 days ago</span>
          </p>
        </div>
        <div className="company-news-item">
          <p className="company-news-headline">
            Reliance Resumes Russian Oil Imports via Compliant Routes, Maintains Jamnagar Refinery Operations
          </p>
          <p>
            <span className="company-news-date">6 days ago</span>
          </p>
        </div>
      </div>
      <p>
        <a className="company-view-more" href="#">View More</a>
      </p>
    </div>
  );
}
