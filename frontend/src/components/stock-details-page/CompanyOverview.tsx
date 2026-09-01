'use client';

import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

function createStripePattern() {
  if (typeof document === 'undefined') return null;
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 6;
  patternCanvas.height = 6;
  const pctx = patternCanvas.getContext('2d');
  if (pctx) {
    pctx.fillStyle = '#dbeafe'; // light blue for the vertical bars
    pctx.fillRect(0, 0, 2, 6); // 2px bar, 4px gap
  }
  return patternCanvas;
}

export default function CompanyOverview({ data }: { data?: any }) {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('techChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const patternCanvas = createStripePattern();
    const pattern = patternCanvas ? ctx.createPattern(patternCanvas, 'repeat') : '#e5f0fa';

    // Mock data for the chart, ideally this would come from the API
    const labels = ['9:15', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    const dataPoints = [1350, 1400, 1370, 1370, 1420, 1443.50, 1480];

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataPoints,
            fill: true,
            backgroundColor: pattern as any,
            borderColor: '#7ba2cd',
            borderWidth: 3,
            tension: 0.4, // Smooth curve
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#7ba2cd',
            pointHoverBorderWidth: 3,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#1e3a8a',
            bodyColor: '#6b7280',
            titleFont: { size: 14, weight: 'bold', family: 'Inter-Medium, sans-serif' },
            bodyFont: { size: 12, family: 'Inter-Regular, sans-serif' },
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (items) => {
                const val = items[0].parsed.y.toLocaleString('en-IN', { minimumFractionDigits: 2 });
                return `Reliance Industries Ltd: ${val}`;
              },
              label: (item) => {
                return 'Monday, April 20 2026';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#f3f4f6',
              drawBorder: false,
              tickLength: 0,
              borderDash: [5, 5]
            },
            ticks: { display: false }
          },
          y: {
            grid: {
              color: '#f3f4f6',
              drawBorder: false,
              tickLength: 0,
              borderDash: [5, 5]
            },
            ticks: { display: false },
            min: 1300,
            max: 1500
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <>
      <section
        id="CompanyOverview"
        className="company-section"
        dangerouslySetInnerHTML={data?.CompanyOverview ? { __html: data.CompanyOverview } : undefined}
      />
    </>
  );
}
