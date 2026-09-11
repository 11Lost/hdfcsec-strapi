'use client';

import { useEffect } from 'react';

export default function VendorInit() {
  useEffect(() => {
    // Load swiper CSS asynchronously to avoid render-blocking
    if (!document.querySelector('link[href*="swiper"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/swiper.css';
      document.head.appendChild(link);
    }

    // Defer heavy library imports to avoid forced reflows during hydration
    Promise.all([
      import('swiper/bundle'),
      import('chart.js/auto'),
    ]).then(([swiperModule, chartModule]) => {
      (window as any).Swiper = swiperModule.default;
      (window as any).Chart = chartModule.default;
    });
  }, []);

  return null;
}
