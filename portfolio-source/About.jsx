import Highlight from './Highlight'
import { profile, gaming, skills } from '../data/resume'

const portraitImg = `${import.meta.env.BASE_URL || './'}portrait.jpg`

export default function About({ query }) {
  const { education } = profile
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-no">01</span>
          <span className="section-en">About</span>
          <h2 className="section-title">个人信息</h2>
          <span className="section-rule" />
        </div>

        <div className="about-grid">
          {/* 头像 / 人物图 */}
          <div className="portrait">
            <img src={portraitImg} alt={`${profile.name} 个人照片`} />
          </div>

          <div className="about-bio">
            {profile.introLines.map((line, i) => (
              <p className="lead lead-sm" key={i}>
                <Highlight text={line} query={query} />
              </p>
            ))}

            <div className="about-facts">
              <div className="fact">
                <div className="k">Email</div>
                <a className="v" href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="fact">
                <div className="k">Phone</div>
                <a className="v" href={`tel:${profile.phone}`}>{profile.phone}</a>
              </div>
              <div className="fact">
                <div className="k">Birth</div>
                <div className="v">{profile.birth}</div>
              </div>
              <div className="fact">
                <div className="k">Based</div>
                <div className="v">{profile.location}</div>
              </div>
            </div>

            {/* 教育背景 */}
            <div className="edu">
              <div className="school">
                {education.school} · {education.major}
              </div>
              <div className="meta">{education.schoolEn} · {education.period}</div>
              <span className="gpa">{education.gpa}</span>
              <div className="courses">
                {education.courses.map((c) => (
                  <span className="tag" key={c}><Highlight text={c} query={query} /></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 游戏经历 + 技能评价 */}
        <div className="split-2" style={{ marginTop: 'clamp(60px,7vw,110px)' }}>
          <div id="gaming">
            <div className="mini-title">Game Experience · 游戏经历</div>
            <p style={{ marginTop: 14, color: 'var(--ink-2)', fontSize: 15.5 }}>
              <Highlight text={gaming.summary} query={query} />
            </p>
            <div className="games-cats">
              {gaming.categories.map((g) => (
                <div className="game-cat" key={g.cat}>
                  <div className="gc-name">
                    <Highlight text={g.cat} query={query} />
                  </div>
                  {g.items.map((t) => (
                    <div className={`game-row${t.report ? ' has-report' : ''}`} key={t.name}>
                      <span className="gn"><Highlight text={t.name} query={query} /></span>
                      <span className="gnt"><Highlight text={t.note} query={query} /></span>
                      {t.report && (
                        <a
                          className="gr-link"
                          href={`#/report/${t.report.id}`}
                          onClick={(e) => { e.preventDefault(); window.location.hash = `#/report/${t.report.id}` }}
                        >
                          {t.report.label}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div id="skills">
            <div className="mini-title">Skills & Self · 技能与评价</div>
            <div className="skills-block">
              {skills.map((s) => (
                <div className="skill-item" key={s.group}>
                  <div className="sg"><Highlight text={s.group} query={query} /></div>
                  {s.lines.map((l, i) => (
                    <p className="st" key={i}><Highlight text={l} query={query} /></p>
                  ))}
                </div>
              ))}
              <div className="skill-item genre-card">
                <div className="sg">Covered Genres · 涉猎品类</div>
                <div className="chips">
                  {gaming.categories.map((g) => (
                    <span className="tag" key={g.cat}><Highlight text={g.cat} query={query} /></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
