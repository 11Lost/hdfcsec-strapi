import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import VendorInit from '@/components/shared/VendorInit';
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

      <body>
        <Header headerData={headerData} />
        <main>{children}</main>
        <Footer />
        <VendorInit />
      </body>
    </html>
  );
}
