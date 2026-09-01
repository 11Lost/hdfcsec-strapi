import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import VendorInit from '@/components/shared/VendorInit';
import { fetchFooter, fetchHeader } from '@/lib/api';

export const metadata: Metadata = {
  title: 'HDFC Securities - Trusted Partner for Your Investment Journey',
  description:
    'HDFC Securities - A trusted partner for your investment journey since 1987. SEBI registered and committed to helping you achieve your financial goals.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData = null;
  let footerData = null;
  try {
    const res = await fetchHeader();
    headerData = res?.data || null;
    const res2 = await fetchFooter();
    footerData = res2?.data || null;
  } catch (error) {
    console.warn('[RootLayout] Failed to fetch header data');
  }
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <Header headerData={headerData} />
        <main>{children}</main>
        <Footer footerData={footerData} />
        <VendorInit />
      </body>
    </html>
  );
}
