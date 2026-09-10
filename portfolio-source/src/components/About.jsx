import Highlight from './Highlight'
import { profile, gaming, skills } from '../data/resume'

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
          {/* 头像 / 人物图占位 */}
          <div className="portrait">
            <div className="ph-initial">{profile.name[0]}</div>
            <div className="ph-label">人物图占位 · 替换为职业照 / 形象照</div>
          </div>

          <div className="about-bio">
            <p className="lead">
              <Highlight text={profile.intro} query={query} />
            </p>

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
            <div className="games-list">
              {gaming.titles.map((g) => (
                <div className="game-row" key={g.name}>
                  <span className="gn"><Highlight text={g.name} query={query} /></span>
                  <span className="gnt">{g.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="skills">
            <div className="mini-title">Skills & Self · 技能与评价</div>
            <div className="skills-block">
              {skills.map((s) => (
                <div className="skill-item" key={s.group}>
                  <div className="sg">{s.group}</div>
                  <p className="st"><Highlight text={s.text} query={query} /></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
