'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/api';

interface InvestingProps {
  data?: {
    WaysToInvestSectionBanner?: {
      Banneritems?: Array<{
        BannerImg?: { url: string; alternativeText?: string };
        bannerContent?: string;
      }>;
    };
    WaysToInvestDetail?: {
      title?: string;
      detailsBanner?: {
        Banneritems?: Array<{
          BannerImg?: { url: string; alternativeText?: string };
          bannerContent?: string;
          _parsedTitle?: string;
          _parsedDescription?: string;
        }>;
      };
    };
    bottombanner?: {
      bannerContent?: string;
      BannerImg?: { url: string };
      BannerBtn?: { label?: string; link?: string };
    };
  };
}

export default function Investing({ data }: InvestingProps) {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<any>(null);
  const [domReady, setDomReady] = useState(false);

  // Strip <img> tags from HTML to prevent browser preload scanner warnings
  const stripImgTags = (html: string) => html.replace(/<img[^>]*>/gi, '');

  const slides = data?.WaysToInvestSectionBanner?.Banneritems || [];
  const ways = data?.WaysToInvestDetail?.detailsBanner?.Banneritems || [];
  const headerHtml = data?.WaysToInvestDetail?.title ? stripImgTags(data.WaysToInvestDetail.title) : '';
  const bb = data?.bottombanner;

  const [toastVisible, setToastVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mark DOM as ready after paint
  useEffect(() => {
    setDomReady(true);
  }, []);

  // Initialize / re-initialize Swiper once DOM is ready and slides exist
  useEffect(() => {
    if (!domReady || !swiperContainerRef.current || slides.length === 0) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const initSwiper = () => {
      if (cancelled) return;
      const w = window as any;
      if (typeof w.Swiper === 'undefined') return;

      // Destroy previous instance if any
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }

      const container = swiperContainerRef.current;
      if (!container) return;

      swiperInstance.current = new w.Swiper(container, {
        dynamicBullets: true,
        slidesPerView: 1,
        centeredSlides: true,
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: container.querySelector('.swiper-pagination') as HTMLElement,
          clickable: true,
        },
      });

      // Force update after init
      setTimeout(() => {
        if (swiperInstance.current && !cancelled) {
          swiperInstance.current.update();
        }
      }, 100);
    };

    // Initialize slider after 3 seconds of page load
    timer = setTimeout(initSwiper, 3000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domReady, slides.length]);

  // Toast: show when investing section scrolls into view, dismiss toggle
  useEffect(() => {
    if (!bb || !sectionRef.current) return;

    let toastShown = false;
    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !toastShown) {
            toastTimer = setTimeout(() => {
              toastShown = true;
              setToastVisible(true);
              observer.disconnect();
            }, 2000);
          } else if (!entry.isIntersecting && toastTimer && !toastShown) {
            clearTimeout(toastTimer);
            toastTimer = null;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, [bb]);

  const toggleToast = () => setToastVisible((v) => !v);

  if (!data) return null;

  return (
    <section ref={sectionRef} className="investing-section">
      <div className="container investing-container">
        <div className="investing-featured">
          <div ref={swiperContainerRef} className="swiper investing-swiper">
            <div className="swiper-wrapper">
              {slides.map((item, i) => {
                const img = item.BannerImg;
                return (
                  <div key={i} className="swiper-slide">
                    <div className="investing-card">
                      <div className="investing-card-image">
                        {getStrapiMediaUrl(img?.url)}
                        {img && (
                          <Image
                            src={getStrapiMediaUrl(img.url)}
                            alt={img.alternativeText || 'Investing Slide'}
                            width={800}
                            height={500}
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>

        <div className="investing-right">
          <div
            className="investing-header"
            dangerouslySetInnerHTML={{ __html: headerHtml }}
          />
          <div className="ways-grid">
            {ways.map((item, i) => {
              const img = item.BannerImg;
              return (
                <div key={i} className="way-card">
                  {item._parsedTitle && <h2 className="way-card-title">{item._parsedTitle}</h2>}
                  {item._parsedDescription && (
                    <p className="way-card-description">{item._parsedDescription}</p>
                  )}
                  <div className="way-card-image">
                    {img && (
                      <Image
                        src={getStrapiMediaUrl(img.url)}
                        alt={img.alternativeText || 'Way card'}
                        width={300}
                        height={200}
                        style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {bb && (
        <div ref={toastRef} className={`toast-popup${toastVisible ? ' visible' : ''}`}>
          <div className="toast-dismiss">
            <button className="toast-dismiss-btn" aria-label="Dismiss" onClick={toggleToast}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
          <div className="toast-content">
            <div className="toast-icon">
              {bb.BannerImg && (
                <Image src={getStrapiMediaUrl(bb.BannerImg.url)} alt="Toast Icon" width={24} height={24} style={{ width: 24, height: 24, objectFit: 'contain' }} />
              )}
            </div>
            <div className="toast-text" dangerouslySetInnerHTML={{ __html: stripImgTags(bb.bannerContent || '') }} />
            <div className="toast-cta">
              <a href={bb.BannerBtn?.link || '#'} className="toast-cta-btn">
                {bb.BannerBtn?.label || 'Get Started'}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
