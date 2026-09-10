import Highlight from './Highlight'
import { tone } from '../lib/cover'
import { internships, projects } from '../data/resume'

function ExpCard({ item, index, query }) {
  return (
    <article className={`exp-card ${index % 2 === 1 ? 'reverse' : ''}`}>
      <div className="exp-media">
        <span className="ph-badge">{item.companyEn}</span>
        <div className={`ph ${tone(item.cover.hue)}`}>
          <span className="ph-label">{item.cover.label}</span>
        </div>
      </div>
      <div className="exp-body">
        <div className="exp-top">
          <div>
            <div className="exp-company">{item.company}</div>
            <div className="exp-role">{item.role}</div>
          </div>
          <div className="exp-period">{item.period}</div>
        </div>

        <p className="exp-summary"><Highlight text={item.summary} query={query} /></p>

        <div className="exp-tags">
          {item.tags.map((t) => <span className="tag" key={t}><Highlight text={t} query={query} /></span>)}
        </div>

        <ul className="exp-highlights">
          {item.highlights.map((h, i) => (
            <li key={i}><Highlight text={h} query={query} /></li>
          ))}
        </ul>

        <div className="exp-metrics">
          {item.metrics.map((m) => (
            <div className="metric" key={m.k}>
              <div className="mv">{m.v}</div>
              <div className="mk">{m.k}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

// 实习经历 + 项目经历模块
export default function Experience({ query }) {
  return (
    <>
      {/* 实习经历 */}
      <section id="experience" className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-no">02</span>
            <span className="section-en">Internship</span>
            <h2 className="section-title">实习经历</h2>
            <span className="section-rule" />
          </div>

          <div className="exp-list">
            {internships.map((it, i) => <ExpCard item={it} index={i} query={query} key={it.id} />)}
          </div>
        </div>
      </section>

      {/* 项目经历 */}
      <section id="project" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="section-no">03</span>
            <span className="section-en">Projects</span>
            <h2 className="section-title">项目经历</h2>
            <span className="section-rule" />
          </div>

          <div className="proj-grid">
            {projects.map((p) => (
              <article className="proj-card" key={p.id}>
                <div className="proj-media">
                  <div className={`ph ${tone(p.cover.hue)}`}>
                    <span className="ph-label">{p.cover.label}</span>
                  </div>
                </div>
                <div className="proj-body">
                  <div className="proj-name">{p.name}</div>
                  <div className="proj-meta">{p.nameEn} · {p.period}</div>
                  <p className="proj-summary"><Highlight text={p.summary} query={query} /></p>
                  <div className="exp-tags" style={{ marginTop: 16 }}>
                    {p.tags.map((t) => <span className="tag" key={t}><Highlight text={t} query={query} /></span>)}
                  </div>
                  <ul className="exp-highlights" style={{ marginTop: 18 }}>
                    {p.highlights.map((h, i) => <li key={i}><Highlight text={h} query={query} /></li>)}
                  </ul>
                  <div className="exp-metrics" style={{ paddingTop: 22 }}>
                    {p.metrics.map((m) => (
                      <div className="metric" key={m.k}>
                        <div className="mv">{m.v}</div>
                        <div className="mk">{m.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
