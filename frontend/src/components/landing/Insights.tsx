'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/api';

interface Stock {
  Name?: string;
}

interface Report {
  title?: string;
  description?: string;
  _descText?: string;
  banner?: { url: string; alternativeText?: string };
  stocks?: Stock[];
}

interface InsightsProps {
  data?: {
    title?: string;
    reports?: Report[];
  };
}

export default function Insights({ data }: InsightsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reports = data?.reports || [];

  if (!data) return null;

  return (
    <section className="insights-section">
      <div className="container">
        <div
          className="insights-header"
          dangerouslySetInnerHTML={{ __html: data.title || '' }}
        />
        <div className="insights-accordion">
          {reports.map((report, index) => {
            const descText = report._descText || '';
            const stocks = report.stocks || [];
            const visibleStocks = stocks.slice(0, 2);
            const moreCount = stocks.length - 2;

            return (
              <div
                key={index}
                className={`insights-card${activeIndex === index ? ' active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="card-compact">
                  <h3 className="card-compact-title">{report.title}</h3>
                  <p className="card-compact-desc">{descText}</p>
                </div>
                <div className="card-expanded">
                  <div className="card-expanded-content">
                    <div className="card-expanded-top">
                      <h3 className="card-expanded-title">{report.title}</h3>
                    </div>
                    {stocks.length > 0 && (
                      <div className="insights-stocks">
                        <span className="insights-stocks-label">Stocks covered:</span>
                        {visibleStocks.map((s, si) => (
                          <span key={si} className="insights-stock-tag">{s.Name}</span>
                        ))}
                        {moreCount > 0 && (
                          <span className="insights-stock-more">+{moreCount} more</span>
                        )}
                      </div>
                    )}
                    <p className="card-expanded-desc">{descText}</p>
                    <a href="#" className="insights-link">Read Full Report</a>
                  </div>
                  {report.banner && (
                    <div className="card-expanded-image">
                      <Image
                        src={getStrapiMediaUrl(report.banner.url)}
                        alt={report.banner.alternativeText || report.title || ''}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
