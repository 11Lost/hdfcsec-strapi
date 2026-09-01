'use client';
import dynamic from 'next/dynamic';

// Disable SSR for the heavy SipCalculator to reduce unused JS on initial load
const SipCalculator = dynamic(() => import('./SipCalculator'), { ssr: false });

export default function SipCalculatorWrapper(props: any) {
  return <SipCalculator {...props} />;
}
