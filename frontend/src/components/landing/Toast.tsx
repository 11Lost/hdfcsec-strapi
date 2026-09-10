'use client';

import { useState, useEffect, useRef } from 'react';

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const investingSection = document.querySelector('.investing-section');
    if (!investingSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !toastShown) {
            toastTimerRef.current = setTimeout(() => {
              setVisible(true);
              setToastShown(true);
            }, 2000);
          } else if (!entry.isIntersecting && toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
            toastTimerRef.current = null;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(investingSection);
    return () => {
      observer.disconnect();
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, [toastShown]);

  return (
    <div className={`toast-popup ${visible ? 'visible' : ''}`}>
      <div className="toast-dismiss">
        <button
          className="toast-dismiss-btn"
          aria-label="Dismiss"
          onClick={() => setVisible(!visible)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      <div className="toast-content">
        <div id="toastIcon" className="toast-icon" />
        <div id="toastText" className="toast-text" />
        <div className="toast-cta">
          <a href="#" id="toastCtaBtn" className="toast-cta-btn">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
