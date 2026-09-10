import Highlight from './Highlight'
import { campus, portfolio } from '../data/resume'

export default function Campus({ query }) {
  return (
    <section id="campus" className="section" style={{ background: 'var(--paper-2)' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-no">04</span>
          <span className="section-en">Campus</span>
          <h2 className="section-title">校园经历</h2>
          <span className="section-rule" />
        </div>

        {campus.map((c) => (
          <article className="campus-card" key={c.id}>
            <div className="campus-head">
              <div className="org">{c.org}</div>
              <div className="role">{c.role}</div>
              <div className="period">{c.period}</div>
              <p className="summary"><Highlight text={c.summary} query={query} /></p>
            </div>
            <div>
              <ul className="exp-highlights">
                {c.highlights.map((h, i) => (
                  <li key={i}><Highlight text={h} query={query} /></li>
                ))}
              </ul>
              <div className="exp-metrics" style={{ paddingTop: 24 }}>
                {c.metrics.map((m) => (
                  <div className="metric" key={m.k}>
                    <div className="mv">{m.v}</div>
                    <div className="mk">{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}

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
            </div>
            <div className="wc-imgs">
              {portfolio.images.map((im) => (
                <figure className="wc-fig" key={im.src}>
                  <img src={im.src} alt={im.alt} />
                </figure>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
