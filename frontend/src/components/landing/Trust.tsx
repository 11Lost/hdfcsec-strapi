'use client';

interface TrustProps {
  data?: {
    counts?: Array<{
      title?: string;
      Count?: string | number;
    }>;
  };
}

export default function Trust({ data }: TrustProps) {
  const counts = data?.counts || [];

  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-container">
          <div className="trust-shape-1" />
          <div className="trust-shape-2" />

          <div className="trust-header">
            <h2 className="trust-title">
              Why Trust <span>HDFC Securities</span>
            </h2>
            <p className="trust-subtitle">
              We understand that trust is earned. Here&apos;s what makes us a
              reliable partner for your investment journey.
            </p>
          </div>

          <div className="trust-stats">
            {counts.length > 0
              ? counts.map((item, i) => (
                  <div key={i} className="trust-stat">
                    <p className="trust-stat-label">{item.title}</p>
                    <p className="trust-stat-value">{item.Count}</p>
                  </div>
                ))
              : [
                  { label: 'Clients', value: '10L+' },
                  { label: 'Years of Trust', value: '35+' },
                  { label: 'Daily Trades', value: '50K+' },
                  { label: 'Branches', value: '250+' },
                ].map((item, i) => (
                  <div key={i} className="trust-stat">
                    <p className="trust-stat-label">{item.label}</p>
                    <p className="trust-stat-value">{item.value}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
