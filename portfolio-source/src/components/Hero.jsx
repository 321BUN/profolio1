import SearchBar from './SearchBar'
import { profile } from '../data/resume'

export default function Hero({ query, setQuery, goTo }) {
  return (
    <section id="home" className="hero">
      <div className="hero-media">
        {/* CSS 动态背景（视频缺失时自动兜底） */}
        <div className="hero-fallback" />
        {/* 真实视频背景：将你的视频放到 public/hero.mp4 即可覆盖兜底 */}
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-scrim" />

      <div className="hero-content">
        <div className="container">
          <div className="hero-eyebrow">{profile.role} · {profile.roleEn}</div>

          <h1 className="hero-title">
            {profile.headline[0]}
            <br />
            <span className="accent">{profile.headline[1]}</span>
          </h1>

          <p className="hero-sub">{profile.tagline}</p>

          <div className="hero-actions">
            <a
              className="btn-primary"
              href="#contact"
              onClick={(e) => { e.preventDefault(); goTo('contact') }}
            >
              联系我
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              className="btn-ghost"
              href="#experience"
              onClick={(e) => { e.preventDefault(); goTo('experience') }}
            >
              查看经历
            </a>
            <SearchBar query={query} setQuery={setQuery} goTo={goTo} variant="hero" />
          </div>
        </div>
      </div>

      <div className="hero-meta">
        <div className="yr">2027</div>
        <div className="lb">Graduating · 应届</div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <span className="dot" />
      </div>
    </section>
  )
}
