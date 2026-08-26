import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { fetchHeader } from '@/lib/api';

export const metadata: Metadata = {
  title: 'HDFC Securities - Trusted Partner for Your Investment Journey',
  description:
    'HDFC Securities - A trusted partner for your investment journey since 1987. SEBI registered and committed to helping you achieve your financial goals.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData = null;
  try {
    const res = await fetchHeader();
    headerData = res?.data || null;
  } catch (error) {
    console.warn('[RootLayout] Failed to fetch header data');
  }
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
        />
      </head>
      <body>
        <Header headerData={headerData} />
        <main>{children}</main>
        <Footer />

        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/chart.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
