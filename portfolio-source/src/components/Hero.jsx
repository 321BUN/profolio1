import { useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import { profile } from '../data/resume'

export default function Hero({ query, setQuery, goTo }) {
  const heroRef = useRef(null)
  const glowRef = useRef(null)

  /* 鼠标色彩跟踪：光晕位置缓动跟随 + 色相随横向位置微偏，出界淡出 */
  useEffect(() => {
    const hero = heroRef.current
    const glow = glowRef.current
    if (!hero || !glow) return
    if (window.matchMedia('(hover: none)').matches) return

    let tx = hero.clientWidth * 0.62
    let ty = hero.clientHeight * 0.34
    let x = tx, y = ty, raf = 0

    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }
    const onEnter = () => { glow.style.opacity = '0.72' }
    const onLeave = () => { glow.style.opacity = '0' }

    const tick = () => {
      x += (tx - x) * 0.055
      y += (ty - y) * 0.055
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      const hx = Math.min(1, Math.max(0, x / Math.max(1, hero.clientWidth)))
      glow.style.filter = `blur(26px) saturate(1.05) hue-rotate(${Math.round((hx - 0.5) * 46)}deg)`
      raf = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseenter', onEnter)
    hero.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseenter', onEnter)
      hero.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-media">
        {/* 朦胧绚烂的 CSS 动态光晕背景 */}
        <div className="hero-fallback" />
        {/* 鼠标色彩跟踪光晕 */}
        <div className="hero-glow" ref={glowRef} />
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
