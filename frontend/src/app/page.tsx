import Ticker from '@/components/landing/Ticker';
import MarketIndices from '@/components/landing/MarketIndices';
import Investing from '@/components/landing/Investing';
import SipCalculator from '@/components/landing/SipCalculator';
import Products from '@/components/landing/Products';
import CalendarEvent from '@/components/landing/CalendarEvent';
import Insights from '@/components/landing/Insights';
import Learn from '@/components/landing/Learn';
import Trust from '@/components/landing/Trust';
import { fetchHomePage, getStrapiMediaUrl } from '@/lib/api';

export default async function HomePage() {
  let pageData: Record<string, any> | null = null;
  try {
    const res = await fetchHomePage();
    pageData = res.data;
  } catch {
    console.warn('[HomePage] Failed to fetch Strapi data');
  }

  const heroBanner = pageData?.HomeBanner?.Banneritems?.[0];
  // Pre-parse way card bannerContent on the server to avoid hydration mismatch
  const waysToInvestRaw = pageData?.WaysToInvestSection;
  function extractFromHtml(html: string, className: string): string {
    if (!html) return '';
    const re = new RegExp(
      `<[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`
    );
    const m = html.match(re);
    return m ? m[1].trim() : '';
  }
  const waysToInvest = waysToInvestRaw
    ? {
      ...waysToInvestRaw,
      WaysToInvestDetail: waysToInvestRaw.WaysToInvestDetail
        ? {
          ...waysToInvestRaw.WaysToInvestDetail,
          detailsBanner:
            waysToInvestRaw.WaysToInvestDetail.detailsBanner
              ? {
                ...waysToInvestRaw.WaysToInvestDetail.detailsBanner,
                Banneritems:
                  (
                    waysToInvestRaw.WaysToInvestDetail.detailsBanner
                      .Banneritems || []
                  ).map((item: any) => ({
                    ...item,
                    _parsedTitle: extractFromHtml(
                      item.bannerContent || '',
                      'way-card-title'
                    ),
                    _parsedDescription: extractFromHtml(
                      item.bannerContent || '',
                      'way-card-description'
                    ),
                  })),
              }
              : undefined,
        }
        : undefined,
    }
    : undefined;
  const ourProduct = pageData?.ourProduct;

  // Server-side HTML strip helper (no DOM dependency)
  function stripServerHtml(html: string): string {
    return html.replace(/<[^>]+>/g, '').trim();
  }

  // Pre-strip report descriptions for Insights
  const expectResult = pageData?.expectResult
    ? {
      ...pageData.expectResult,
      reports: (pageData.expectResult.reports || []).map((r: any) => ({
        ...r,
        _descText: r.description ? stripServerHtml(r.description) : '',
      })),
    }
    : undefined;

  // Pre-strip course descriptions and pre-format dates for Learn
  const learningCourses = pageData?.LearningCourses
    ? {
      ...pageData.LearningCourses,
      learning_courses: (pageData.LearningCourses.learning_courses || []).map(
        (c: any) => ({
          ...c,
          _descText: c.Description ? stripServerHtml(c.Description) : '',
          _topics: (c.question_and_answers || [])
            .filter((qa: any) => qa.Question && qa.createdAt)
            .slice(0, 3)
            .map((qa: any) => ({
              question: qa.Question,
              date: new Date(qa.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }),
              courseTitle: c.Title || '',
            })),
        })
      ),
    }
    : undefined;
  const countSection = pageData?.CountSection;

  // Parse hero banner content
  let heroTitleHtml = 'Loading...';
  let heroSubtitleHtml = '';
  let heroCtaLabel = '';
  let heroCtaLink = '';
  let heroMediaUrl = '';
  let heroMediaMime = '';
  let heroMediaAlt = '';

  if (heroBanner?.bannerContent) {
    // Extract title and subtitle from bannerContent HTML
    const titleMatch = heroBanner.bannerContent.match(/<h1[^>]*class="hero-title"[^>]*>([\s\S]*?)<\/h1>/);
    const subtitleMatch = heroBanner.bannerContent.match(/<p[^>]*class="hero-subtitle"[^>]*>([\s\S]*?)<\/p>/);
    if (titleMatch) heroTitleHtml = titleMatch[1];
    if (subtitleMatch) heroSubtitleHtml = subtitleMatch[1];
  }
  if (heroBanner?.BannerBtn) {
    heroCtaLabel = heroBanner.BannerBtn.label || '';
    heroCtaLink = heroBanner.BannerBtn.link || '#';
  }
  if (heroBanner?.BannerImg) {
    heroMediaUrl = getStrapiMediaUrl(heroBanner.BannerImg.url);
    heroMediaMime = heroBanner.BannerImg.mime || '';
    heroMediaAlt = heroBanner.BannerImg.alternativeText || 'Hero Banner';
  }

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          {heroMediaMime.startsWith('video') ? (
            <video className="hero-bg-video" autoPlay muted loop playsInline>
              <source src={heroMediaUrl} type={heroMediaMime} />
            </video>
          ) : heroMediaUrl ? (
            <img
              className="hero-bg-image"
              src={heroMediaUrl}
              alt={heroMediaAlt}
            />
          ) : (
            <video className="hero-bg-video" autoPlay muted loop playsInline>
              <source src="/video/hero_bg_video.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 id="heroTitle" className="hero-title" dangerouslySetInnerHTML={{ __html: heroTitleHtml }} />
            <p id="heroSubtitle" className="hero-subtitle" dangerouslySetInnerHTML={{ __html: heroSubtitleHtml }} />
            {heroCtaLabel && (
              <a
                href={heroCtaLink}
                id="heroCta"
                className="btn btn-primary"
              >
                {heroCtaLabel}
              </a>
            )}
          </div>
          <div className="hero-image">
            <div className="market-panel">
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
