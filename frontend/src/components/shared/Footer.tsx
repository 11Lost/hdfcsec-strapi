'use client';

import { useEffect, useState } from 'react';
import { STRAPI_BASE } from '@/lib/api';

interface FooterMenuLink {
  label: string;
  link?: string;
  target?: string;
}

interface FooterSubMenu {
  title?: string;
  link?: string;
  MenuLink?: FooterMenuLink[];
}

interface FooterMenu {
  title: string;
  subMenus?: FooterSubMenu[];
}

interface FooterBtn {
  label: string;
  link?: string;
  target?: string;
  icon?: { url: string };
  functionName?: string;
}

interface FooterData {
  Icon?: { iconImg?: { url: string } }[];
  disclaimer?: string;
  footerBtns?: FooterBtn[];
  footerMenu?: FooterMenu[];
  footerHtmlContent?: string;
}

function buildUrl(link?: string): string {
  if (!link) return '#';
  if (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('mailto:') ||
    link.startsWith('tel:') ||
    link.startsWith('#')
  ) {
    return link;
  }
  return '/' + link.replace(/^\/+/, '');
}

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    fetch(`${STRAPI_BASE}/api/footer?pLevel=10`)
      .then((r) => r.json())
      .then((res) => setFooter(res?.data))
      .catch((err) => console.error('Failed to load footer:', err));
  }, []);

  const logoUrl = footer?.Icon?.[0]?.iconImg?.url
    ? STRAPI_BASE + footer.Icon[0].iconImg.url
    : '/images/hdfc_white_logo.svg';

  const quickLinks = footer?.footerBtns || [];
  const menus = footer?.footerMenu || [];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-logo-placeholder">
              <img src={logoUrl} alt="HDFC Securities" />
            </div>
          </div>
          <p
            className="footer-tagline"
            dangerouslySetInnerHTML={{
              __html:
                footer?.disclaimer ||
                'A trusted partner for your investment journey since 1987.<br>SEBI registered and committed to helping you achieve your financial goals.',
            }}
          />
        </div>

        <div className="footer-quick-links">
          {quickLinks.map((btn, i) => {
            const iconUrl = btn.icon?.url
              ? STRAPI_BASE + btn.icon.url
              : '';
            return (
              <a
                key={i}
                href={buildUrl(btn.link)}
                className="footer-quick-link"
                target={btn.target}
              >
                {iconUrl && (
                  <img
                    src={iconUrl}
                    alt={btn.label}
                    className="footer-quick-link-icon"
                  />
                )}
                {btn.label}
              </a>
            );
          })}
        </div>

        <div className="footer-columns">
          {menus.map((menu, i) => (
            <div key={i}>
              <h4 className="footer-column-title">{menu.title}</h4>
              <ul className="footer-column-list">
                {menu.subMenus?.map((sub, j) => {
                  if (sub.MenuLink && sub.MenuLink.length) {
                    return sub.MenuLink.map((link, k) => (
                      <li key={k}>
                        <a
                          href={buildUrl(link.link)}
                          target={link.target}
                        >
                          {link.label}
                        </a>
                      </li>
                    ));
                  }
                  return (
                    <li key={j}>
                      <a href={buildUrl(sub.link)}>{sub.title}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="footer-details"
          dangerouslySetInnerHTML={{
            __html: footer?.footerHtmlContent || '',
          }}
        />
      </div>
    </footer>
  );
}
