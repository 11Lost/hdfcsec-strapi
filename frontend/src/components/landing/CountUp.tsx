'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** The target display string, e.g. "25+", "5m+", "24/7" */
  target: string | number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Suffix to append after the animated number (e.g. "+", "m+") */
  suffix?: string;
}

/**
 * Parses a count string like "25+", "5m+", "24/7" into a numeric value and a suffix.
 * Returns { value, suffix } where value is the number to animate to.
 */
function parseCount(target: string | number): { value: number; suffix: string } {
  if (typeof target === 'number') {
    return { value: target, suffix: '' };
  }

  const str = String(target).trim();

  // Match patterns: "25+", "5m+", "24/7", "10L+", "50K+", "250+"
  const match = str.match(/^([\d.]+)(.*)$/);
  if (!match) {
    return { value: 0, suffix: str };
  }

  return {
    value: parseFloat(match[1]),
    suffix: match[2], // everything after the number, e.g. "+", "m+", "/7", "L+", "K+"
  };
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({ target, duration = 2000 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(String(target));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { value, suffix } = parseCount(target);

    // If the value is 0 or not a number, just show the original string
    if (isNaN(value) || value === 0) {
      setDisplay(String(target));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCount(value, suffix, duration);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  function animateCount(targetValue: number, suffix: string, animDuration: number) {
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animDuration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(easedProgress * targetValue);

      setDisplay(`${currentValue}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  return (
    <span ref={ref} className="count-up-value">
      {display}
    </span>
  );
}
