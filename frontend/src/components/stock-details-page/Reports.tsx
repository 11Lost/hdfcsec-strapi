'use client';

export default function Reports({ data }: { data?: any }) {
  return (
    <div className="overview-card" style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px', background: 'white' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Reports</h3>
      {data?.Reports ? (
        <div dangerouslySetInnerHTML={{ __html: data.Reports }} />
      ) : (
        <p style={{ color: '#64748B' }}>No reports available.</p>
      )}
    </div>
  );
}
