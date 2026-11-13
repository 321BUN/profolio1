import { useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import { profile } from '../data/resume'

export default function Hero({ query, setQuery, goTo }) {
  const heroRef = useRef(null)
  const t1 = useRef(null)
  const t2 = useRef(null)
  const t3 = useRef(null)

  /* 整屏波浪色彩：三层超大柔光以不同速度追赶鼠标 → 拖尾错位成波；
     叠加各自的 sin/cos 自主起伏，静止时色彩也在缓慢流动；
     色相随鼠标横向位置整体偏移，移动越快波幅越大 */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const layers = [
      { el: t1.current, ease: 0.042, ax: 292, ay: 206, ph: 0.0, blur: 40, base: 0.90 },
      { el: t2.current, ease: 0.062, ax: 344, ay: 252, ph: 1.9, blur: 48, base: 0.88 },
      { el: t3.current, ease: 0.086, ax: 252, ay: 318, ph: 3.4, blur: 54, base: 0.88 },
    ].filter((l) => l.el)
    if (!layers.length) return

    const rect = () => hero.getBoundingClientRect()
    let r = rect()
    let tx = r.width * 0.12
    let ty = -r.height * 0.1
    let lastTx = tx, lastTy = ty
    let hueBase = 0, hueTarget = 0, amp = 0.4, raf = 0
    layers.forEach((l) => { l.x = tx; l.y = ty })

    const onMove = (e) => {
      const b = rect()
      tx = e.clientX - b.left - b.width / 2
      ty = e.clientY - b.top - b.height / 2
      hueTarget = ((e.clientX - b.left) / Math.max(1, b.width) - 0.5) * 92
    }
    const onResize = () => { r = rect() }
    const tick = (t) => {
      const dx = tx - lastTx, dy = ty - lastTy
      const spd = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 22)
      lastTx = tx; lastTy = ty
      amp += (spd - amp) * 0.09
      hueBase += (hueTarget - hueBase) * 0.05
      /* 自主色相漂移：即使鼠标不动，整屏色彩也随时间缓慢流转 */
      const hue = hueBase + Math.sin(t / 5600) * 44 + Math.sin(t / 3500) * 20
      const wave = 0.9 + amp * 0.8
      layers.forEach((l) => {
        l.x += (tx - l.x) * l.ease
        l.y += (ty - l.y) * l.ease
        const wx = Math.sin(t / 2150 + l.ph) * l.ax * wave
        const wy = Math.cos(t / 2550 + l.ph * 1.4) * l.ay * wave
        l.el.style.transform = `translate3d(${(l.x + wx).toFixed(1)}px, ${(l.y + wy).toFixed(1)}px, 0)`
        l.el.style.filter = `blur(${l.blur}px) hue-rotate(${hue.toFixed(1)}deg)`
        /* 明暗呼吸：三层不同相位，整屏色彩如波浪起伏 */
        l.el.style.opacity = (l.base + Math.sin(t / 3800 + l.ph * 1.6) * 0.3).toFixed(3)
      })
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-media">
        {/* 深蓝黑底 */}
        <div className="hero-fallback" />
        {/* 整屏波浪色彩层 */}
        <div className="hero-tide">
          <span className="tide t1" ref={t1} />
          <span className="tide t2" ref={t2} />
          <span className="tide t3" ref={t3} />
        </div>
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
