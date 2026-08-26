'use client';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source src="/video/hero_bg_video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 id="heroTitle" className="hero-title">
            Loading...
          </h1>
          <p id="heroSubtitle" className="hero-subtitle" />
          <a href="#" id="heroCta" className="btn btn-primary" style={{ display: 'none' }} />
        </div>
        <div className="hero-image">
          <div className="market-panel glass-card">
            <div id="marketGrid" className="market-grid" />
          </div>
        </div>
      </div>
    </section>
  );
}
