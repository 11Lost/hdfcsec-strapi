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
  Tooltip,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);

export default function ResearchAnalysis() {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('researchChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create Gradient for the area fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)'); // Light blue transparent
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    // Mock data points based on the screenshot
    const dataPoints = [100, 1150, 2800, 2100, 2800, 2600, 4000, 2200, 2000, 3300];
    const labels = [
      'Sep 1, 2024',
      '',
      'Jan 1, 2024',
      '',
      '',
      '',
      'May 1, 2024', // Roughly where the peak is
      'Sep 1, 2024',
      '',
      'Jan 1, 2024',
    ];

    // Determine the peak index to highlight it
    const peakIndex = 6; // index of 4000

    const pointRadiusArray = dataPoints.map((_, i) => (i === peakIndex ? 6 : 0));
    const pointBorderColorArray = dataPoints.map((_, i) => (i === peakIndex ? 'rgba(59, 130, 246, 0.3)' : 'transparent'));
    const pointBorderWidthArray = dataPoints.map((_, i) => (i === peakIndex ? 8 : 0));

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataPoints,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#3b82f6', // Blue line
            borderWidth: 2,
            tension: 0, // Straight lines between points
            pointRadius: pointRadiusArray,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: pointBorderColorArray as any,
            pointBorderWidth: pointBorderWidthArray,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 20, right: 20, left: 10, bottom: 10 },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#fff',
            titleColor: '#111928',
            bodyColor: '#6b7280',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            displayColors: false,
          },
        },
        scales: {
          x: {
            border: { display: false, dash: [5, 5] },
            grid: {
              display: true,
              color: '#f3f4f6',
              tickLength: 0,
            },
            ticks: {
              color: '#6b7280',
              font: { family: 'Inter-Regular, sans-serif', size: 12 },
              maxRotation: 0,
              autoSkip: false,
              callback: function (val, index) {
                return labels[index] || '';
              }
            },
          },
          y: {
            border: { display: false, dash: [5, 5] },
            grid: {
              display: true,
              color: '#f3f4f6',
              tickLength: 0,
            },
            ticks: {
              color: '#6b7280',
              font: { family: 'Inter-Regular, sans-serif', size: 12 },
              stepSize: 500,
              padding: 10,
            },
            min: 0,
            max: 4500,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="researchWrapper">
      <section id="research-analysis" className="research-section">
        <div className="container">
          <div className="research-header">
            <h2 className="research-title">
              Research <span>Analysis</span>
            </h2>
            <p className="research-subtitle">
              Professional research that explains how the company is performing
              and what experts expect in the future.
            </p>
          </div>

          <div className="research-content">
            <div className="research-chart-panel">
              <div className="research-chart-wrapper" style={{ height: '350px', position: 'relative' }}>
                <div className="research-chart-label" style={{ position: 'absolute', top: '-10px', left: '0', fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Price (₹)</div>
                <div className="research-chart-container" style={{ width: '100%', height: '100%', paddingTop: '10px' }}>
                  <canvas id="researchChart" />
                </div>
              </div>
              <div className="research-stats-bar" style={{ marginTop: '30px' }}>
                {[
                  ['Current Market Price', '1548.50'],
                  ['Target', '1850'],
                  ['Stop loss', '1500'],
                  ['Reco Price', '₹3110.30'],
                  ['Reco Date', '29 Jul 2024'],
                  ['Call Type', 'SIP'],
                ].map(([label, value]) => (
                  <div key={label} className="research-stat">
                    <div className="research-stat-label" style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{label}</div>
                    <div
                      className={`research-stat-value ${label === 'Reco Price' ? 'highlight' : ''}`}
                      style={{ fontSize: '16px', fontWeight: 600, color: '#111928' }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
