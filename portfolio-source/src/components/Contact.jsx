import { profile } from '../data/resume'

export default function Contact() {
  const year = new Date().getFullYear()
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-eyebrow">Let's talk · 期待与你共事</div>
        <h2 className="contact-title">
          感谢您的<span className="accent">观看</span>
        </h2>
        <p className="contact-sub">
          欢迎就实习 / 校招机会与我联系。简历与作品细节可进一步提供，期待聊聊游戏、内容与增长。
        </p>

        <div className="contact-grid">
          <div className="contact-cell">
            <div className="ck">Email</div>
            <div className="cv"><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
          </div>
          <div className="contact-cell">
            <div className="ck">Phone / 微信</div>
            <div className="cv"><a href={`tel:${profile.phone}`}>{profile.phone}</a></div>
          </div>
          <div className="contact-cell">
            <div className="ck">Location</div>
            <div className="cv">{profile.location}</div>
          </div>
        </div>

        <div className="contact-actions">
          <a className="btn-primary" href={`mailto:${profile.email}`}>
            发送邮件
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a className="btn-ghost" href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            回到顶部
          </a>
        </div>

        <div className="contact-foot">
          <span>© {year} {profile.name} · Personal Portfolio</span>
          <span>Built with React + Vite</span>
        </div>
      </div>
    </section>
  )
}
