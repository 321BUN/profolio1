import SearchBar from './SearchBar'
import Aurora from './Aurora'
import { profile } from '../data/resume'

export default function Hero({ query, setQuery, goTo }) {
  return (
    <section id="home" className="hero">
      <div className="hero-media">
        {/* 蓝调浅色渐变底（保留浅色，不引入黑底） */}
        <div className="hero-fallback" />
        {/* Aurora 波浪极光：长春花蓝主导 + 一缕柔和落日橙，鼠标经过处波浪升高、饱和度增强 */}
        <Aurora
          colorStops={['#2E4494', '#6D82C9', '#FFBE8A']}
          amplitude={0.85}
          speed={0.5}
          blend={0.32}
        />
      </div>
      <div className="hero-scrim" />

      <div className="hero-content">
        <div className="container">
          <div className="hero-eyebrow">{profile.nameEn} · 2027 届 · {profile.education.school}</div>

          <h1 className="hero-title">
            {profile.name}
            <span className="accent">。</span>
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
