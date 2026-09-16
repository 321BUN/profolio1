import { useState, useMemo, useEffect, useCallback } from 'react'
import { reports, reportList } from '../data/reports'

const B = import.meta.env.BASE_URL || './'

const slug = (s, i) => `sec-${i}`

// 把 docx 里的“一、”“1.1 ”这类前缀去掉，目录更干净
const cleanToc = (s) => s.replace(/^[一二三四五六七八九十]+、\s*/, '').replace(/^\d+(\.\d+)*\s*/, '')

export default function ReportDetail() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const id = (hash.match(/^#\/report\/(.+)$/) || [])[1]
  const data = reports[id] || reports.nikki
  const meta = data.meta
  const blocks = data.blocks
  const [lightbox, setLightbox] = useState(null)

  // 目录：二级及以上标题
  const toc = useMemo(
    () =>
      blocks
        .map((b, i) => ({ ...b, i }))
        .filter((b) => b.t === 'h' && b.lvl >= 1)
        .map((b) => ({ i: b.i, lvl: b.lvl, text: cleanToc(b.v) })),
    [blocks],
  )

  const jump = useCallback((i) => {
    const el = document.getElementById(slug(null, i))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const other = reportList.find((r) => r.id !== id)

  return (
    <div className="wd">
      <header className="wd-bar">
        <div className="container wd-bar-inner">
          <a
            className="wd-back"
            href="#works"
            onClick={(e) => { e.preventDefault(); window.history.back() }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            返回
          </a>
          <div className="wd-bar-title">{meta.title}</div>
          <a className="wd-doc-link" href={`${B}${meta.docx}`} download={`${meta.title}.docx`}>
            下载 docx ↓
          </a>
        </div>
      </header>

      <section className="wd-hero">
        <div className="container">
          <div className="wc-badge">{meta.kicker} · 游戏拆解分析报告</div>
          <h1 className="wd-title">{meta.title}</h1>
          <div className="wc-meta">{meta.game} · {meta.sub}</div>
          <p className="wd-intro">{meta.summary}</p>
          <div className="rp-stats rp-stats-hero">
            <span><b>{(meta.stats.words / 1000).toFixed(1)}k</b> 字</span>
            <span><b>{meta.toc.length}</b> 个章节</span>
            <span><b>{meta.stats.tables}</b> 张数据表</span>
            {meta.stats.imgs > 0 && <span><b>{meta.stats.imgs}</b> 张配图</span>}
          </div>
        </div>
      </section>

      <div className="rp-wrap">
        <div className="container rp-layout">
          <aside className="rp-aside">
            <div className="rp-aside-inner">
              <div className="rp-aside-title">目录</div>
              <nav className="rp-toc-nav">
                {toc.map((t) => (
                  <button
                    key={t.i}
                    className={`rp-toc-item lvl-${t.lvl}`}
                    onClick={() => jump(t.i)}
                    type="button"
                  >
                    {t.text}
                  </button>
                ))}
              </nav>
              <a
                className="btn-ghost rp-aside-dl"
                href={`${B}${meta.docx}`}
                download={`${meta.title}.docx`}
              >
                下载 docx 原件 ↓
              </a>
            </div>
          </aside>

          <article className="rp-doc">
            {blocks.map((b, i) => {
              if (b.t === 'h') {
                const Tag = b.lvl === 1 ? 'h2' : b.lvl === 2 ? 'h3' : 'h4'
                return (
                  <Tag className={`rp-h rp-h${b.lvl}`} id={slug(null, i)} key={i}>
                    {b.v}
                  </Tag>
                )
              }
              if (b.t === 'p') {
                return <p className="rp-p" key={i}>{b.v}</p>
              }
              if (b.t === 'table') {
                const [head, ...rows] = b.rows
                return (
                  <div className="rp-table-wrap" key={i}>
                    <table className="rp-table">
                      {head && head.length > 1 && (
                        <thead>
                          <tr>{head.map((c, j) => <th key={j}>{c}</th>)}</tr>
                        </thead>
                      )}
                      <tbody>
                        {(head && head.length > 1 ? rows : b.rows).map((r, j) => (
                          <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
              if (b.t === 'img') {
                return (
                  <figure
                    className="rp-fig"
                    key={i}
                    onClick={() => setLightbox({ src: `${B}report-img/${b.src}`, alt: b.alt })}
                  >
                    <img src={`${B}report-img/${b.src}`} alt={b.alt} loading="lazy" />
                    {b.alt && b.alt.length < 40 && <figcaption>{b.alt}</figcaption>}
                  </figure>
                )
              }
              return null
            })}

            {other && (
              <div className="rp-next">
                <span className="rp-next-label">继续阅读</span>
                <a
                  className="rp-next-link"
                  href={`#/report/${other.id}`}
                  onClick={(e) => { e.preventDefault(); window.location.hash = `#/report/${other.id}` }}
                >
                  {other.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            )}
          </article>
        </div>
      </div>

      {lightbox && (
        <div className="wd-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt || ''} onClick={(e) => e.stopPropagation()} />
          <button className="wd-lb-close" type="button" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}
    </div>
  )
}
