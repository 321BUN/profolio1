import Highlight from './Highlight'
import { profile, gaming, skills } from '../data/resume'

const base = import.meta.env.BASE_URL || './'

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
          {/* 可交互 Q 版形象：鼠标悬停 / 点击时挥手打招呼（wink + 头微偏 + 碎发飘动） */}
          <div
            className="portrait qchar"
            tabIndex={0}
            role="img"
            aria-label="Q 版人物形象，鼠标悬停会挥手打招呼"
            onClick={(e) => e.currentTarget.classList.toggle('q-hi')}
          >
            <div className="q-stack">
              <img className="q-frame q-idle" src={`${base}qchar-idle.jpg`} alt={`${profile.name} 的 Q 版人物形象`} />
              <img className="q-frame q-wave q-wave-a" src={`${base}qchar-wave-a.jpg`} alt="" aria-hidden="true" />
              <img className="q-frame q-wave q-wave-b" src={`${base}qchar-wave-b.jpg`} alt="" aria-hidden="true" />
            </div>
            <span className="ph-label">Q 版形象 · 把鼠标放上来打个招呼 👋</span>
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

        {/* 游戏经历（全宽） */}
        <div className="about-block" id="gaming" style={{ marginTop: 'clamp(60px,7vw,110px)' }}>
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

        {/* 技能与评价（全宽，沿用原有排版 · 两栏无卡片） */}
        <div className="about-block" id="skills" style={{ marginTop: 'clamp(60px,7vw,110px)' }}>
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
          </div>
        </div>
      </div>
    </section>
  )
}
