'use client';

export default function FAQ({ data }: { data?: any }) {
  if (!data?.FAQ) return <section id="faq" className="faq-section" />;
  return (
    <section 
      id="faq" 
      className="faq-section" 
      dangerouslySetInnerHTML={{ __html: data.FAQ }} 
    />
  );
}
