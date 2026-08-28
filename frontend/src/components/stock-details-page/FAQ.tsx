'use client';

import { useRef, useEffect } from 'react';

export default function FAQ({ data }: { data?: any }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleClick = (e: MouseEvent) => {
      const question = (e.target as HTMLElement).closest('.faq-question');
      if (!question) return;

      const item = question.closest('.faq-item');
      if (!item) return;

      // Close other open items
      const allItems = section.querySelectorAll('.faq-item.active');
      allItems.forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('active');
      });

      // Toggle current item
      item.classList.toggle('active');
    };

    section.addEventListener('click', handleClick);
    return () => section.removeEventListener('click', handleClick);
  }, [data]);

  if (!data?.FAQ) return <section id="faq" className="faq-section" />;
  return (
    <section
      id="faq"
      className="faq-section"
      ref={sectionRef}
      dangerouslySetInnerHTML={{ __html: data.FAQ }}
    />
  );
}
