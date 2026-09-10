import type { Metadata } from 'next';
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
        {/* Google Fonts - Inter with all weights */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Critical above-the-fold CSS inlined to avoid render-blocking */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        {/* Load full stylesheet asynchronously — non-render-blocking */}
        <link rel="stylesheet" href="/globals.css" media="print" suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: `document.querySelectorAll('link[media="print"]').forEach(l=>{l.media='all';l.onload=null;l.onerror=null;})` }} />
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

/* Critical above-the-fold CSS — inlined to eliminate render-blocking requests.
   Covers: reset, variables, container, buttons, header, hero, ticker.
   The full globals.css is loaded asynchronously via <link media="print"> above. */
const criticalCss = `
/* Reset */
*,*::before,*::after{margin:0;padding:0;border:0;box-sizing:border-box}
html,body{height:100%;width:100%;font-size:16px;line-height:1.5}
h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}
ul,ol{list-style:none}
a{text-decoration:none;color:inherit}
img{max-width:100%;height:auto;display:block}
button,input,textarea,select{font:inherit;color:inherit;border:0}
button{cursor:pointer;border:none;background:none;box-shadow:none}
table{border-collapse:collapse;border-spacing:0}

/* Font Family Mappings (Google Fonts Inter) */
@font-face{font-family:'Inter-Thin';src:local('Inter Thin');font-weight:100;font-style:normal;font-display:swap}
@font-face{font-family:'Inter-Light';src:local('Inter Light');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Inter-Regular';src:local('Inter');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Inter-Medium';src:local('Inter Medium');font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:'Inter-SemiBold';src:local('Inter SemiBold');font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:'Inter-Bold';src:local('Inter Bold');font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:'Inter ExtraBold';src:local('Inter ExtraBold');font-weight:800;font-style:normal;font-display:swap}
@font-face{font-family:'Inter-Black';src:local('Inter Black');font-weight:900;font-style:normal;font-display:swap}

/* Variables */
:root{--color-blue:#1E429F;--color-red:#E02424;--color-white:#FFFFFF;--color-black:#000000;--color-text:#292929}
body{font-family:'Inter',sans-serif}

/* Container */
.container{width:100%;max-width:1300px;margin:0 auto;padding:0 20px;box-sizing:border-box}

/* Buttons */
.btn{display:inline-block;padding:12px 16px;border-radius:60px;font-family:'Inter-SemiBold',sans-serif;font-size:14px;text-decoration:none;text-align:center;cursor:pointer;transition:all .3s ease;border:none}
.btn-primary{background-color:var(--color-red);color:var(--color-white)}
.btn-primary:hover{background-color:#c41e1e;transform:translateY(-2px)}
.btn-secondary{background-color:transparent;color:var(--color-white);border:1px solid var(--color-white)}
.btn-secondary:hover{background-color:var(--color-white);color:var(--color-blue)}

/* Header */
.header{position:fixed;top:0;z-index:1000;margin:0 auto;right:0;left:0}
.header.header-scrolled{background-color:#FFFFFF}
.header.header-scrolled .header-main{background-color:#FFFFFF;box-shadow:0 2px 10px rgba(0,0,0,.08)}
.header-promo{padding:10px 20px;text-align:center;min-height:40px;display:flex;align-items:center;justify-content:center}
.header-promo-text{font-family:'Inter-Regular',sans-serif;font-size:14px;color:#83a6ff;line-height:1.5}
.header-promo-text strong{font-weight:600}
.header-main{background-color:var(--color-white);border-bottom:1px solid #E5E7EB;padding:0 20px;max-width:1300px;margin:0 auto;border-radius:30px;min-height:70px}
.header-main-container{max-width:1400px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:70px;gap:10px}
.header-logo{display:flex;align-items:center;gap:8px;flex-shrink:0;text-decoration:none}
.header-logo img{width:140px}
.header-logo-icon{width:40px;height:40px}
.header-logo-content{display:flex;flex-direction:column}
.header-logo-name{font-family:'Inter-Bold','Inter-SemiBold',sans-serif;font-size:16px;font-weight:700;color:#111827;line-height:1.2}
.header-nav{display:flex;align-items:center;gap:4px}
.header-nav-item{position:relative;padding:8px 5px;font-family:'Inter-Regular',sans-serif;font-size:14px;color:#374151;text-decoration:none;cursor:pointer;transition:color .2s ease;display:flex;align-items:center;gap:4px;border-radius:8px}
.header-nav-item:hover{color:#1E429F;background-color:#F1F5F9}
.header-nav-item svg{width:14px;height:14px;transition:transform .2s ease}
.header-nav-item:hover svg{transform:rotate(180deg)}
.header-dropdown{position:absolute;top:100%;left:0;min-width:200px;background-color:var(--color-white);border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.12);border:1px solid #E5E7EB;padding:8px;opacity:0;visibility:hidden;transform:translateY(8px);transition:all .2s ease;z-index:100}
.header-nav-item:hover .header-dropdown{opacity:1;visibility:visible;transform:translateY(0)}
.header-dropdown-item{display:block;padding:10px 14px;font-family:'Inter-Regular',sans-serif;font-size:14px;color:#374151;text-decoration:none;border-radius:8px;transition:all .2s ease}
.header-dropdown-item:hover{background-color:#F1F5F9;color:#1E429F}
.header-right{display:flex;align-items:center;gap:12px}
.header-search{position:relative;display:flex;align-items:center}
.header-search-input{padding:8px 12px 8px 36px;border:1px solid #E5E7EB;border-radius:8px;font-size:14px;width:200px;outline:none;transition:border-color .2s}
.header-search-input:focus{border-color:var(--color-blue)}
.header-icon-btn{position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px;color:#6B7280;transition:all .2s}
.header-icon-btn:hover{background-color:#F1F5F9;color:var(--color-blue)}
.header-icon-badge{position:absolute;top:2px;right:2px;width:16px;height:16px;background-color:var(--color-red);color:#fff;font-size:10px;font-weight:600;border-radius:50%;display:flex;align-items:center;justify-content:center}
.header-open-account{padding:8px 20px;background-color:var(--color-blue);color:#fff;border-radius:8px;font-family:'Inter-SemiBold',sans-serif;font-size:14px;cursor:pointer;transition:all .2s}
.header-open-account:hover{background-color:#1a3a8a}
.header-login{padding:8px 16px;color:var(--color-blue);font-family:'Inter-SemiBold',sans-serif;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:4px;transition:all .2s}
.header-login:hover{background-color:#F1F5F9;border-radius:8px}
.header-mobile-menu{display:none;width:40px;height:40px;align-items:center;justify-content:center;color:#374151}
.header-mobile-nav{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:2000;opacity:0;visibility:hidden;transition:all .3s}
.header-mobile-nav.active{opacity:1;visibility:visible}
.header-mobile-nav-content{position:absolute;top:0;right:0;width:320px;max-width:85vw;height:100%;background:#fff;overflow-y:auto;transform:translateX(100%);transition:transform .3s}
.header-mobile-nav.active .header-mobile-nav-content{transform:translateX(0)}
.header-mobile-nav-header{display:flex;align-items:center;justify-content:space-between;padding:16px;border-bottom:1px solid #E5E7EB}
.header-mobile-nav-close{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;color:#6B7280}
.header-mobile-nav-links{padding:8px 0}
.header-mobile-nav-link{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;font-family:'Inter-Regular',sans-serif;font-size:15px;color:#374151}
.header-mobile-nav-actions{padding:16px;border-top:1px solid #E5E7EB;display:flex;flex-direction:column;gap:8px}

/* Hero */
.hero{background:#FFF;min-height:600px;max-height:750px;padding:105px 0 0;position:relative;overflow:hidden}
.hero-media{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}
.hero-bg-video{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0}
.hero-bg-image{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0}
.hero .container{display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:3}
.hero-content{max-width:550px;padding-top:76px}
.hero-title{font-family:'Inter-Medium';font-size:58px;font-weight:normal;line-height:1.15;color:#111928;margin-bottom:24px}
.hero-subtitle{font-family:'Inter-Regular';font-size:16px;color:#292929;line-height:1.6;margin-bottom:32px;max-width:400px}
.hero-image{position:relative;z-index:2}
.market-panel{background:rgba(255,255,255,.08);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;min-height:380px}

/* Ticker */
.ticker-section{position:relative;z-index:5;background:var(--color-white);border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB}
.ticker-tabs{display:flex;gap:0;padding:12px 0 0}
.ticker-tab{padding:8px 20px;font-family:'Inter-SemiBold',sans-serif;font-size:13px;color:#6B7280;background:none;border:none;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s}
.ticker-tab.active{color:var(--color-blue);border-bottom-color:var(--color-blue)}
.ticker-wrapper{overflow:hidden;padding:0 0 12px}
.ticker-content{display:flex;gap:0;animation:ticker-scroll 30s linear infinite;white-space:nowrap}
.ticker-item{display:inline-flex;align-items:center;gap:12px;padding:8px 24px;min-width:200px}
.ticker-stock-name{font-family:'Inter-SemiBold',sans-serif;font-size:13px;color:#374151}
.ticker-price{font-family:'Inter-Regular',sans-serif;font-size:12px;color:#6B7280}
.ticker-sparkline{width:60px;height:20px}
.ticker-change{font-family:'Inter-SemiBold',sans-serif;font-size:13px}
.ticker-change.positive,.ticker-item.positive .ticker-change{color:#16A34A}
.ticker-change.negative,.ticker-item.negative .ticker-change{color:#DC2626}
@keyframes ticker-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* Footer */
.footer{background:#0A1628;color:#fff;padding:60px 0 30px}
.footer-container{max-width:1300px;margin:0 auto;padding:0 20px}
.footer-top{display:flex;align-items:flex-start;gap:30px;margin-bottom:40px}
.footer-logo{flex-shrink:0}
.footer-logo-placeholder{width:160px}
.footer-tagline{font-size:13px;color:#9CA3AF;line-height:1.6;max-width:500px}
.footer-quick-links{display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap}
.footer-quick-link{display:flex;align-items:center;gap:8px;padding:10px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#D1D5DB;font-size:13px;transition:all .2s}
.footer-quick-link:hover{background:rgba(255,255,255,.1);color:#fff}
.footer-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:30px;margin-bottom:40px}
.footer-column-title{font-family:'Inter-SemiBold',sans-serif;font-size:14px;color:#fff;margin-bottom:12px;cursor:pointer;list-style:none}
.footer-column-list{list-style:none}
.footer-column-list li{margin-bottom:8px}
.footer-column-list a{font-size:13px;color:#9CA3AF;text-decoration:none;transition:color .2s}
.footer-column-list a:hover{color:#fff}
.footer-details{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;font-size:12px;color:#6B7280}

@media(max-width:1024px){
.header-nav,.header-right{display:none}
.header-mobile-menu{display:flex}
.hero-title{font-size:40px}
.hero-content{padding-top:40px}
}
@media(max-width:768px){
.hero{min-height:500px;padding-top:80px}
.hero-title{font-size:32px}
.hero .container{flex-direction:column}
}
@media(max-width:480px){
.hero-title{font-size:28px}
.header-icon-btn{display:none}
}
`;