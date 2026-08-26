'use client';

import { getStrapiMediaUrl } from '@/lib/api';

export default function StockHero({ data }: { data?: any }) {
  return (
    <section className="stock-hero">
      <div className="container">
        <div className="stock-hero-content">
          <div className="stock-hero-company">
            {data?.icon?.url ? (
              <div 
                className="stock-hero-logo" 
                style={{ 
                  backgroundImage: `url(${getStrapiMediaUrl(data.icon.url)})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  backgroundRepeat: 'no-repeat', 
                  border: 'none',
                  backgroundColor: 'transparent'
                }}
              />
            ) : (
              <div className="stock-hero-logo">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
                </svg>
              </div>
            )}
            <div className="stock-hero-details">
              <h1 id="dyn-stock-name" className="stock-hero-name">
                {data?.Name || 'Reliance Industries Pvt Ltd'}
              </h1>
              <p className="stock-hero-tagline">
                {data?.subTitle || "India's largest diversified business group"}
              </p>
              <div className="stock-hero-tags" />
            </div>
          </div>

          <div className="stock-hero-center">
            <div className="stock-hero-price-row">
              <span id="dyn-stock-price" className="stock-hero-price">
                ₹1,566.49
              </span>
              <div className="stock-hero-change">
                <span
                  id="dyn-stock-change"
                  className="stock-hero-change-value positive"
                >
                  +26.08(1.4%)
                </span>
                <span className="stock-hero-change-period">1D</span>
              </div>
            </div>
            <div className="stock-hero-icons">
              <button className="stock-hero-icon-btn" title="Add to Watchlist">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </button>
              <button className="stock-hero-icon-btn" title="Compare">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="stock-hero-actions">
            <div className="stock-hero-btns">
              <button className="stock-hero-btn buy">Buy</button>
              <button className="stock-hero-btn sell">Sell</button>
              <button className="stock-hero-btn sip">SIP</button>
            </div>
            <a className="stock-hero-option-chain" href="#">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              Option Chain
            </a>
          </div>
        </div>

        <nav className="stock-hero-nav">
          <a className="stock-hero-nav-item active" href="#overview">
            Overview
          </a>
          <a className="stock-hero-nav-item" href="#company-overview">
            Company Overview
          </a>
          <a className="stock-hero-nav-item" href="#peer-comparison">
            Peer Comparison
          </a>
          <a className="stock-hero-nav-item" href="#return-calculator">
            Return Calculator
          </a>
          <a className="stock-hero-nav-item" href="#research-analysis">
            Research Analysis
          </a>
          <a className="stock-hero-nav-item" href="#faq">
            FAQ
          </a>
        </nav>
      </div>
    </section>
  );
}
