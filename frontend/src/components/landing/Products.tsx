'use client';

import { getStrapiMediaUrl } from '@/lib/api';

interface ProductsProps {
  data?: {
    our_products?: Array<{
      title?: string;
      Img?: { url: string; alternativeText?: string };
    }>;
  };
}

export default function Products({ data }: ProductsProps) {
  const products = data?.our_products || [];

  if (!data) return null;

  return (
    <section className="products-section">
      <div className="container">
        <div className="products-header">
          <h2 className="products-title">
            Our <span>Products</span>
          </h2>
          <p className="products-subtitle">
            Everything you need to build, manage, and grow your investments
          </p>
        </div>
        <div className="products-grid">
          {products.map((product, i) => {
            const img = product.Img;
            return (
              <a key={i} href="#" className="product-card">
                <div className="product-icon">
                  {img && (
                    <img
                      src={getStrapiMediaUrl(img.url)}
                      alt={img.alternativeText || product.title || ''}
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="product-name">{product.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
