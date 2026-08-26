'use client';

export default function News({ data }: { data?: any }) {
  return (
    <div className="overview-card" style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px', background: 'white' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>News</h3>
      {data?.News ? (
        <div dangerouslySetInnerHTML={{ __html: data.News }} />
      ) : (
        <p style={{ color: '#64748B' }}>No recent news.</p>
      )}
    </div>
  );
}
