import HomeSections from '@/components/landing/HomeSections';
import { fetchHomePage, getStrapiMediaUrl } from '@/lib/api';

export default async function HomeV2Page() {
  let pageData: Record<string, any> | null = null;
  try {
    const res = await fetchHomePage();
    pageData = res.data;
  } catch {
    console.warn('[HomeV2] Failed to fetch Strapi data');
  }

  const heroBanner = pageData?.HomeBanner?.Banneritems?.[0];
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
                      Banneritems: (
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

  function stripServerHtml(html: string): string {
    return html.replace(/<[^>]+>/g, '').trim();
  }

  const expectResult = pageData?.expectResult
    ? {
        ...pageData.expectResult,
        reports: (pageData.expectResult.reports || []).map((r: any) => ({
          ...r,
          _descText: r.description ? stripServerHtml(r.description) : '',
        })),
      }
    : undefined;

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
    const titleMatch = heroBanner.bannerContent.match(
      /<h1[^>]*class="hero-title"[^>]*>([\s\S]*?)<\/h1>/
    );
    const subtitleMatch = heroBanner.bannerContent.match(
      /<p[^>]*class="hero-subtitle"[^>]*>([\s\S]*?)<\/p>/
    );
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
    <HomeSections
      heroTitleHtml={heroTitleHtml}
      heroSubtitleHtml={heroSubtitleHtml}
      heroCtaLabel={heroCtaLabel}
      heroCtaLink={heroCtaLink}
      heroMediaUrl={heroMediaUrl}
      heroMediaMime={heroMediaMime}
      heroMediaAlt={heroMediaAlt}
      waysToInvest={waysToInvest}
      ourProduct={ourProduct}
      expectResult={expectResult}
      learningCourses={learningCourses}
      countSection={countSection}
    />
  );
}
