import Highlight from './Highlight'
import { campus } from '../data/resume'

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

        <p className="wc-hint" style={{ marginTop: 18 }}>
          文创作品集与两份游戏拆解分析报告，已收录在「05 作品集」中 →
        </p>
      </div>
    </section>
  )
}
