'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/api';

export default function Header({ headerData }: { headerData?: any }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileNavOpen]);

  const navItems = headerData?.menu?.map((item: any) => ({
    label: item.title,
    href: item.link || '#',
    subMenus: item.subMenus || [],
  })) || [
      { label: 'Markets', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Research', href: '#' },
      { label: 'Learn', href: '#' },
      { label: 'Tools', href: '#' },
      { label: 'Support', href: '#' },
    ];

  const headerTopHtml = headerData?.headerTop || '';
  const ctaBtn1 = headerData?.ctaButtons?.[0];
  const ctaBtn2 = headerData?.ctaButtons?.[1];
  const logoUrl = headerData?.icon?.iconImg?.url
    ? getStrapiMediaUrl(headerData.icon.iconImg.url)
    : '/images/logo_main.svg';
  const logoAlt = headerData?.icon?.iconImg?.alternativeText || 'HDFC securities';

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      {headerTopHtml ? (
        <div
          className="header-promo"
          dangerouslySetInnerHTML={{ __html: headerTopHtml }}
        />
      ) : (
        <div className="header-promo" />
      )}

      <div className="header-main">
        <div className="header-main-container">
          <Link href="/" className="header-logo header-logo-large">
            <Image src={logoUrl} alt={logoAlt} width={140} height={40} style={{ width: 140, height: 'auto' }} priority />
          </Link>

          <nav className="header-nav" id="headerNav">
            {navItems.map((item: any) => (
              <div key={item.label} className="header-nav-item">
                <a href={item.href}>
                  {item.label}
                  {item.subMenus && item.subMenus.length > 0 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </a>
                {item.subMenus && item.subMenus.length > 0 && (
                  <div className="header-dropdown">
                    {item.subMenus.map((subMenu: any, idx: number) => (
                      <div key={idx} style={{ marginBottom: idx < item.subMenus.length - 1 ? '8px' : 0 }}>
                        {subMenu.title && (
                          <div style={{ padding: '4px 14px', fontSize: '12px', fontWeight: 'bold', color: '#9CA3AF', textTransform: 'uppercase' }}>
                            {subMenu.title}
                          </div>
                        )}
                        {subMenu.MenuLink?.map((link: any, i: number) => (
                          <a key={i} href={link.link || '#'} className="header-dropdown-item">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header-right">
            <div className="header-search">
              <svg
                className="header-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="header-search-input"
                placeholder="Search stocks, funds..."
              />
            </div>

            <button className="header-icon-btn" title="Documents">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </button>
            <button className="header-icon-btn" title="Notifications">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="header-icon-badge">1</span>
            </button>

            {ctaBtn1 ? (
              <a href={ctaBtn1.link} className="header-open-account" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                {ctaBtn1.label}
              </a>
            ) : (
              <button className="header-open-account">Open Trading A/C</button>
            )}

            {ctaBtn2 ? (
              <a href={ctaBtn2.link} className="header-login" style={{ textDecoration: 'none' }}>
                {ctaBtn2.label}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
            ) : (
              <button className="header-login">
                Login
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
          </div>

          <button
            className="header-mobile-menu"
            onClick={() => setMobileNavOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`header-mobile-nav ${mobileNavOpen ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileNavOpen(false);
        }}
      >
        <div className="header-mobile-nav-content">
          <div className="header-mobile-nav-header">
            <Link href="/" className="header-logo">
              <svg
                className="header-logo-icon"
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect width="40" height="40" rx="4" fill="#E02424" />
                <text
                  x="50%"
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="Arial"
                >
                  HDFC
                </text>
              </svg>
              <div className="header-logo-content">
                <span className="header-logo-name">HDFC securities</span>
              </div>
            </Link>
            <button
              className="header-mobile-nav-close"
              onClick={() => setMobileNavOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="header-mobile-nav-links">
            {navItems.map((item: any) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="header-mobile-nav-link"
                >
                  {item.label}
                  {item.subMenus && item.subMenus.length > 0 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </a>
                {item.subMenus && item.subMenus.length > 0 && (
                  <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                    {item.subMenus.map((subMenu: any, idx: number) => (
                      <div key={idx}>
                        {subMenu.title && (
                          <div style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', color: '#9CA3AF', textTransform: 'uppercase' }}>
                            {subMenu.title}
                          </div>
                        )}
                        {subMenu.MenuLink?.map((link: any, i: number) => (
                          <a key={i} href={link.link || '#'} className="header-mobile-nav-link" style={{ fontSize: '14px', padding: '8px 16px' }}>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="header-mobile-nav-actions">
            {ctaBtn1 ? (
              <a href={ctaBtn1.link} className="header-open-account" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                {ctaBtn1.label}
              </a>
            ) : (
              <button className="header-open-account">
                Open Trading A/C
              </button>
            )}
            {ctaBtn2 ? (
              <a href={ctaBtn2.link} className="header-login" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                {ctaBtn2.label}
              </a>
            ) : (
              <button
                className="header-login"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
