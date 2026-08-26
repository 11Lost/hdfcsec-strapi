'use client';

export default function CompanyOverview({ data }: { data?: any }) {
  return (
    <>
      <section 
        id="CompanyOverview" 
        className="company-section" 
        dangerouslySetInnerHTML={data?.CompanyOverview ? { __html: data.CompanyOverview } : undefined} 
      />
      <section id="CompanyDetails" className="company-section" />
    </>
  );
}
