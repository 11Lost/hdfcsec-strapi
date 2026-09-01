'use client';

import dynamic from 'next/dynamic';

// Dynamic imports with ssr: false - only runs on client
const MarketIndices = dynamic(() => import('./MarketIndices'), { ssr: false });
const Ticker = dynamic(() => import('./Ticker'), { ssr: false });
const Investing = dynamic(() => import('./Investing'), { ssr: false });
const SipCalculator = dynamic(() => import('./SipCalculator'), { ssr: false });
const Products = dynamic(() => import('./Products'), { ssr: false });
const CalendarEvent = dynamic(() => import('./CalendarEvent'), { ssr: false });
const Insights = dynamic(() => import('./Insights'), { ssr: false });
const Learn = dynamic(() => import('./Learn'), { ssr: false });
const Trust = dynamic(() => import('./Trust'), { ssr: false });

interface HomeSectionsProps {
  heroTitleHtml: string;
  heroSubtitleHtml: string;
  heroCtaLabel: string;
  heroCtaLink: string;
  heroMediaUrl: string;
  heroMediaMime: string;
  heroMediaAlt: string;
  waysToInvest: any;
  ourProduct: any;
  expectResult: any;
  learningCourses: any;
  countSection: any;
}

export default function HomeSections({
  heroTitleHtml,
  heroSubtitleHtml,
  heroCtaLabel,
  heroCtaLink,
  heroMediaUrl,
  heroMediaMime,
  heroMediaAlt,
  waysToInvest,
  ourProduct,
  expectResult,
  learningCourses,
  countSection,
}: HomeSectionsProps) {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          {heroMediaMime.startsWith('video') ? (
            <video className="hero-bg-video" autoPlay muted loop playsInline preload="metadata">
              <track kind="captions" srcLang="en" label="English" default />
              <source src={heroMediaUrl} type={heroMediaMime} />
            </video>
          ) : heroMediaUrl ? (
            <img
              className="hero-bg-image"
              src={heroMediaUrl}
              alt={heroMediaAlt}
              width={1920}
              height={1080}
              fetchPriority="high"
            />
          ) : (
            <video className="hero-bg-video" autoPlay muted loop playsInline preload="metadata">
              <track kind="captions" srcLang="en" label="English" default />
              <source src="/video/hero_bg_video.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="container">
          <div className="hero-content">
            <h1
              id="heroTitle"
              className="hero-title"
              dangerouslySetInnerHTML={{ __html: heroTitleHtml }}
            />
            <p
              id="heroSubtitle"
              className="hero-subtitle"
              dangerouslySetInnerHTML={{ __html: heroSubtitleHtml }}
            />
            {heroCtaLabel && (
              <a href={heroCtaLink} id="heroCta" className="btn btn-primary">
                {heroCtaLabel}
              </a>
            )}
          </div>
          <div className="hero-image">
            <div className="market-panel glass-card">
              <MarketIndices />
            </div>
          </div>
        </div>
        <Ticker />
      </section>

      <Investing data={waysToInvest} />
      <SipCalculator />
      <Products data={ourProduct} />
      <CalendarEvent />
      <Insights data={expectResult} />
      <Learn data={learningCourses} />
      <Trust data={countSection} />
    </>
  );
}
