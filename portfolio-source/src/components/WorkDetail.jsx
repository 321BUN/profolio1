import { useEffect, useState, useCallback } from 'react'
import { portfolio } from '../data/resume'
import { wcSlides } from '../data/wenchuangSlides'

const B = import.meta.env.BASE_URL || './'

// 作品详情页：视频全播放 / 文档全浏览 / PPT 翻页 / 图库
export default function WorkDetail() {
  const d = portfolio.detail
  const [slide, setSlide] = useState(0)
  const [lightbox, setLightbox] = useState(null) // 当前放大的图片对象

  const pptTotal = (d.ppt && d.ppt.pages) || wcSlides.length || 27
  const go = useCallback((n) => setSlide((s) => Math.min(pptTotal - 1, Math.max(0, n))), [pptTotal])

  // 键盘：← → 翻 PPT，ESC 关闭灯箱
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) { if (e.key === 'Escape') setLightbox(null); return }
      if (e.key === 'ArrowRight') go(slide + 1)
      if (e.key === 'ArrowLeft') go(slide - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slide, lightbox, go])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="wd">
      {/* 顶栏 */}
      <header className="wd-bar">
        <div className="container wd-bar-inner">
          <a className="wd-back" href="#campus" onClick={(e) => { e.preventDefault(); window.history.back() }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            返回作品集
          </a>
          <div className="wd-bar-title">{portfolio.title}</div>
          <a className="wd-contact" href="#contact" onClick={(e) => {
            e.preventDefault()
            window.location.hash = ''
            setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 60)
          }}>
            联系我
          </a>
        </div>
      </header>

      {/* 作品头 */}
      <section className="wd-hero">
        <div className="container">
          <div className="wc-badge">Portfolio · 文创作品集 · 详情</div>
          <h1 className="wd-title">{portfolio.title}</h1>
          <div className="wc-meta">{portfolio.titleEn} · {portfolio.role} · {portfolio.period}</div>
          <p className="wd-intro">{d.intro}</p>
          <div className="exp-tags">
            {portfolio.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* 01 作品图库 */}
      <section className="wd-section">
        <div className="container">
          <div className="wd-sec-head">
            <span className="wd-sec-no">01</span>
            <h2 className="wd-sec-title">作品图库</h2>
            <span className="wd-sec-note">{d.gallery.length} 张 · 点击查看大图</span>
          </div>
          <div className="wd-gallery">
            {d.gallery.map((g, i) => (
              <figure className="wd-fig" key={i} onClick={() => setLightbox(g)}>
                <img src={g.src} alt={g.alt} loading="lazy" />
                <figcaption>{g.tag}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 02 答辩 PPT（原版式逐页浏览） */}
      {d.ppt && d.ppt.pages && (
        <section className="wd-section">
          <div className="container">
            <div className="wd-sec-head">
              <span className="wd-sec-no">02</span>
              <h2 className="wd-sec-title">答辩 PPT · 原版式浏览</h2>
              <span className="wd-sec-note">{d.ppt.meta}</span>
              <a className="wd-doc-link" href={d.ppt.src} download>下载完整 PPT ↓</a>
            </div>
            <div className="wd-ppt">
              <div className="wd-ppt-stage">
                <button className="wd-ppt-nav" onClick={() => go(slide - 1)} disabled={slide === 0} aria-label="上一页">←</button>
                <div className="wd-ppt-slide" key={slide}>
                  <img
                    src={d.ppt.pageImg(slide + 1)}
                    alt={`PPT 第 ${slide + 1} 页`}
                    onClick={() => setLightbox({ src: d.ppt.pageImg(slide + 1), alt: `PPT 第 ${slide + 1} 页` })}
                  />
                </div>
                <button className="wd-ppt-nav" onClick={() => go(slide + 1)} disabled={slide === pptTotal - 1} aria-label="下一页">→</button>
              </div>
              <div className="wd-ppt-no">第 {String(slide + 1).padStart(2, '0')} / {pptTotal} 页</div>
              <div className="wd-ppt-dots">
                {Array.from({ length: pptTotal }, (_, i) => (
                  <button
                    key={i}
                    className={`wd-dot ${i === slide ? 'on' : ''}`}
                    onClick={() => go(i)}
                    title={`第 ${i + 1} 页`}
                  />
                ))}
              </div>
              <p className="wd-tip">支持键盘 ← → 翻页 · 点击当前页可放大 · 完整 PPT 可下载</p>
            </div>
          </div>
        </section>
      )}

      {/* 03 视频全播放 */}
      {d.video && (
        <section className="wd-section">
          <div className="container">
            <div className="wd-sec-head">
              <span className="wd-sec-no">03</span>
              <h2 className="wd-sec-title">项目视频</h2>
              <span className="wd-sec-note">{d.video.label}</span>
            </div>
            <div className="wd-video">
              <video controls preload="metadata" poster={d.video.poster} playsInline>
                <source src={d.video.src} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      )}

      {/* 04 手册浓缩概览（一行 7 页） */}
      {d.pdf && (
        <section className="wd-section wd-section-last">
          <div className="container">
            <div className="wd-sec-head">
              <span className="wd-sec-no">04</span>
              <h2 className="wd-sec-title">项目手册 · 概览</h2>
              <span className="wd-sec-note">{d.pdf.meta}</span>
              <a className="wd-doc-link" href={d.pdf.src} target="_blank" rel="noreferrer">新窗口打开 ↗</a>
              <a className="wd-doc-link" href={d.pdf.src} download>下载 PDF ↓</a>
            </div>
            <div className="wd-pages wd-pages-compact">
              {Array.from({ length: d.pdf.pages }, (_, i) => i + 1).map((n) => (
                <figure className="wd-page wd-page-sm" key={n} onClick={() => setLightbox({ src: d.pdf.pageImg(n), alt: `手册第 ${n} 页` })}>
                  <img src={d.pdf.pageImg(n)} alt={`手册第 ${n} 页`} loading="lazy" />
                  <figcaption>{n}</figcaption>
                </figure>
              ))}
            </div>
            <p className="wd-tip">点击任意页面可放大查看 · 完整 PDF 可下载离线阅读</p>
          </div>
        </section>
      )}

      {/* 底部 */}
      <footer className="wd-foot">
        <div className="container">
          <a className="btn-primary" href="#campus" onClick={(e) => { e.preventDefault(); window.history.back() }}>
            返回作品集
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </footer>

      {/* 灯箱 */}
      {lightbox && (
        <div className="wd-lightbox" onClick={() => setLightbox(null)}>
          <button className="wd-lb-close" aria-label="关闭">✕</button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
          <div className="wd-lb-cap">{lightbox.alt}</div>
        </div>
      )}
    </div>
  )
}
