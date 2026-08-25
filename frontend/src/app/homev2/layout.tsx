import type { Metadata } from 'next';
import '../globals.css';
import Script from 'next/script';
import Header from '@/components/shared/Header';
import FooterClient from '@/components/shared/FooterClient';
import { STRAPI_BASE } from '@/lib/api';
import type { FooterData } from '@/components/shared/FooterClient';

export const metadata: Metadata = {
  title: 'HDFC Securities - Trusted Partner for Your Investment Journey',
  description:
    'HDFC Securities - A trusted partner for your investment journey since 1987. SEBI registered and committed to helping you achieve your financial goals.',
};

async function fetchFooterData(): Promise<FooterData | null> {
  try {
    const res = await fetch(`${STRAPI_BASE}/api/footer?pLevel=10`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export default async function HomeV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await fetchFooterData();

  return (
    <>
      <head>
        {/* Preload Swiper CSS */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
        />

        {/* Inline perf CSS */}
        <style dangerouslySetInnerHTML={{ __html: perfCss }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <FooterClient data={footerData} />

        {/* Defer heavy scripts */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/chart.js"
          strategy="lazyOnload"
        />
      </body>
    </>
  );
}

const perfCss = `
/* CLS fixes - reserve space for dynamic content */
.market-panel{min-height:380px}
.investing-swiper{min-height:500px}
.products-grid{min-height:120px}
.insights-accordion{min-height:200px}
.course-swiper{min-height:300px}
.trust-stats{min-height:120px}
.investing-card-image img,.way-card-image img,.product-icon img,.card-expanded-image img{aspect-ratio:16/9}
.toast-popup{position:fixed;bottom:-130px;left:0;right:0;z-index:1000}
.toast-popup.visible{bottom:0}
.hero-bg-image{aspect-ratio:16/9}
/* Footer - reserve space to prevent CLS */
.footer{min-height:300px}
`;
