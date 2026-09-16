import Highlight from './Highlight'
import { portfolio } from '../data/resume'
import { reportList } from '../data/reports'

const B = import.meta.env.BASE_URL || './'

const goHash = (e, hash) => {
  e.preventDefault()
  window.location.hash = hash
}

export default function Works({ query }) {
  return (
    <section id="works" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-no">05</span>
          <span className="section-en">Works</span>
          <h2 className="section-title">作品集</h2>
          <span className="section-rule" />
        </div>

        {/* 文创作品集 */}
        <article className="wc-card" id="portfolio">
          <div className="wc-badge">Portfolio · 文创作品集</div>
          <div className="wc-grid">
            <div className="wc-body">
              <div className="wc-title">
                <Highlight text={portfolio.title} query={query} />
              </div>
              <div className="wc-meta">
                {portfolio.titleEn} · {portfolio.role} · {portfolio.period}
              </div>
              <p className="wc-summary"><Highlight text={portfolio.summary} query={query} /></p>
              <div className="exp-tags">
                {portfolio.tags.map((t) => (
                  <span className="tag" key={t}><Highlight text={t} query={query} /></span>
                ))}
              </div>
              <ul className="exp-highlights">
                {portfolio.highlights.map((h, i) => (
                  <li key={i}><Highlight text={h} query={query} /></li>
                ))}
              </ul>
              <a
                className="btn-primary wc-more"
                href="#/work/wenchuang"
                onClick={(e) => goHash(e, '#/work/wenchuang')}
              >
                查看完整作品
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <div className="wc-hint">项目视频 · 41 页手册全文 · 27 页答辩 PPT · 10 张作品图</div>
            </div>
            <div
              className="wc-imgs wc-imgs-click"
              onClick={() => { window.location.hash = '#/work/wenchuang' }}
              title="点击查看完整作品"
            >
              {portfolio.images.map((im) => (
                <figure className="wc-fig" key={im.src}>
                  <img src={im.src} alt={im.alt} />
                </figure>
              ))}
            </div>
          </div>
        </article>

        {/* 游戏拆解分析报告 */}
        <div className="rp-block">
          <div className="rp-block-head">
            <span className="rp-block-no">Game Analysis</span>
            <h3 className="rp-block-title">游戏深度体验与拆解分析报告</h3>
            <span className="rp-block-note">全文在线可读 · 支持站内搜索 · 附原件下载</span>
          </div>

          <div className="rp-grid">
            {reportList.map((r) => (
              <article className="rp-card" key={r.id}>
                <a
                  className="rp-cover"
                  href={`#/report/${r.id}`}
                  onClick={(e) => goHash(e, `#/report/${r.id}`)}
                >
                  {r.cover ? (
                    <img src={`${B}report-img/${r.cover}`} alt={r.title} loading="lazy" />
                  ) : (
                    <div className="rp-cover-ph">
                      <span className="rp-cover-game">{r.game}</span>
                      <span className="rp-cover-sub">{r.sub}</span>
                    </div>
                  )}
                  <span className="rp-kicker">{r.kicker}</span>
                  <span className="rp-cover-mask" />
                </a>

                <div className="rp-body">
                  <h4 className="rp-title"><Highlight text={r.title} query={query} /></h4>
                  <div className="rp-meta">{r.sub}</div>
                  <p className="rp-summary"><Highlight text={r.summary} query={query} /></p>

                  <div className="rp-stats">
                    <span><b>{(r.stats.words / 1000).toFixed(1)}k</b> 字</span>
                    <span><b>{r.stats.tables}</b> 张数据表</span>
                    {r.stats.imgs > 0 && <span><b>{r.stats.imgs}</b> 张配图</span>}
                    <span><b>{r.toc.length}</b> 个章节</span>
                  </div>

                  <ol className="rp-toc">
                    {r.toc.slice(0, 6).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                    {r.toc.length > 6 && <li className="rp-toc-more">…等共 {r.toc.length} 章</li>}
                  </ol>

                  <div className="rp-actions">
                    <a
                      className="btn-primary rp-btn"
                      href={`#/report/${r.id}`}
                      onClick={(e) => goHash(e, `#/report/${r.id}`)}
                    >
                      阅读报告全文
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                    <a
                      className="btn-ghost rp-btn"
                      href={`${B}${r.docx}`}
                      download={`${r.title}.docx`}
                    >
                      下载 docx ↓
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
