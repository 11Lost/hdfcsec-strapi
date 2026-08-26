'use client';

import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import Chart from 'chart.js/auto';

export default function VendorInit() {
  useEffect(() => {
    (window as any).Swiper = Swiper;
    (window as any).Chart = Chart;
  }, []);

  return null;
}
