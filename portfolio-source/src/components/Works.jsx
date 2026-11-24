import { useState, useEffect } from 'react'
import Highlight from './Highlight'
import { portfolio, aigcAccount } from '../data/resume'
import { reportList } from '../data/reports'

const B = import.meta.env.BASE_URL || './'

const goHash = (e, hash) => {
  e.preventDefault()
  window.location.hash = hash
}

const socialAccounts = [
  {
    id: 'sm-chengzi',
    cat: '方言文化内容',
    name: '吃点橙子',
    meta: '欢聚集团 · 实习运营账号 · 小红书',
    sum: '以聊天记录的形式做方言与地域文化梗，围绕粤语、河南话等日常语感创作高互动内容，多条笔记进入热门。',
    tags: ['方言梗', '聊天记录', '地域文化', '高互动'],
    highlights: [
      '内容形式：把日常对话截图做成笔记，「古风小生」「河南话很哲学」等选题引发地域共鸣。',
      '数据表现：单篇最高 7684 赞、301 收藏、2542 评论，多条笔记点赞破千。',
    ],
    hint: '小红书 · 聊天记录长图 · 持续更新',
    sign: '原来古风小生只是你们广东人的日常',
    stats: [{ v: '7684', k: '单篇最高点赞' }, { v: '2542', k: '单篇最高评论' }],
    link: 'https://www.xiaohongshu.com/user/profile/682058e1000000000d009073',
    cover: `${B}xhs-chengzi-preview.jpg`,
    full: `${B}xhs-chengzi-full.jpg`,
    alt: '吃点橙子 · 三屏聊天记录笔记（含点赞收藏评论数据）',
  },
  {
    id: 'sm-game',
    cat: '游戏营销拆解',
    name: '壹只大游物TEAM',
    meta: '远岸连山 · 实习运营账号 · 小红书',
    sum: '拆解游戏发行与营销事件，从三角洲增长到二游直播，输出长图文分析，沉淀可复用的营销观察方法。',
    tags: ['游戏营销', '案例拆解', '长图文', '发行策略'],
    highlights: [
      '选题方向：「三角洲的传奇增长」「二游抖次元直播」等发行与增长事件复盘。',
      '内容形式：封面主标题 + 数据与事件线，长图文拆解营销打法。',
    ],
    hint: '小红书 · 营销观察长图文 · 持续更新',
    sign: '如何锻造游戏长青的发行思路',
    stats: [{ v: '2 篇', k: '代表拆解' }, { v: '长图文', k: '内容形式' }],
    link: 'https://www.xiaohongshu.com/user/profile/6922b40d000000003702e529',
    cover: `${B}xhs-game-cover.jpg`,
    full: `${B}xhs-game-full.jpg`,
    alt: '壹只大游物TEAM · 游戏营销拆解封面',
  },
  {
    id: 'sm-nvshu',
    cat: '女书文化共创',
    name: 'GenZ女书艺术发展计划',
    meta: '女书文化 · 女性成长共创 · 小红书',
    sum: '以女书文化与女性成长为内核，聚合高校学子做内容传播与线下活动，让非遗文字进入当代语境。',
    tags: ['女书文化', '女性成长', '高校共创', '线下活动'],
    highlights: [
      '传播行动：「妇女节，我们把女书写上大屏」等城市公共空间投放。',
      '共创机制：CSC 城市画布作品征集，聚合高校学子参与创作。',
    ],
    hint: '小红书 · 城市画布 · 作品征集',
    sign: '把女书写上大屏，也写进日常',
    stats: [{ v: '5000', k: '粉丝' }, { v: '8.4 万', k: '获赞与收藏' }],
    link: 'https://www.xiaohongshu.com/user/profile/648537a60000000010035bac',
    cover: `${B}xhs-nvshu-cover.jpg`,
    full: `${B}xhs-nvshu-full.jpg`,
    alt: 'GenZ女书艺术发展计划 · 小红书主页与笔记',
  },
]

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])
  return (
    <div className="sm-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="图片放大预览">
      <div className="sm-lightbox-box" onClick={(e) => e.stopPropagation()}>
        <img src={item.full} alt={item.alt} />
        <div className="sm-lightbox-bar">
          <span>{item.alt}</span>
          <div className="sm-lightbox-actions">
            <a href={item.full} target="_blank" rel="noreferrer">查看原图 ↗</a>
            <button type="button" onClick={onClose}>关闭 ✕</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Works({ query }) {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section id="works" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-no">05</span>
          <span className="section-en">Works</span>
          <h2 className="section-title">作品集</h2>
          <span className="section-rule" />
        </div>

        {/* 自媒体账号组 · 前置到作品集最前 */}
        <div className="sm-group" id="social">
          {/* AIGC 自媒体账号 */}
          <article className="wc-card" id="aigc">
            <div className="wc-badge">{aigcAccount.badge}</div>
            <div className="wc-grid">
              <div className="wc-body">
                <div className="wc-title">
                  <Highlight text={aigcAccount.name} query={query} />
                </div>
                <div className="wc-meta">{aigcAccount.meta}</div>
                <p className="wc-summary"><Highlight text={aigcAccount.summary} query={query} /></p>
                <div className="exp-tags">
                  {aigcAccount.tags.map((t) => (
                    <span className="tag" key={t}><Highlight text={t} query={query} /></span>
                  ))}
                </div>
                <ul className="exp-highlights">
                  {aigcAccount.highlights.map((h, i) => (
                    <li key={i}><Highlight text={h} query={query} /></li>
                  ))}
                </ul>
                <div className="wc-hint">小红书号 49624163325 · 动态视频内容 · 持续更新</div>
              </div>
              <a className="aigc-panel" href={aigcAccount.link} target="_blank" rel="noreferrer" title="访问小红书主页">
                <span
                  className="aigc-marquee"
                  style={{ backgroundImage: `url(${aigcAccount.covers})` }}
                  role="img"
                  aria-label="「转念花开」笔记封面滚动预览"
                />
                <span className="aigc-kicker">Xiaohongshu · 小红书</span>
                <span className="aigc-name">转念花开</span>
                <span className="aigc-sign">「{aigcAccount.sign}」</span>
                <div className="aigc-stats">
                  {aigcAccount.metrics.map((m) => (
                    <div key={m.k}><b>{m.v}</b><i>{m.k}</i></div>
                  ))}
                </div>
                <span className="aigc-go">访问主页 →</span>
              </a>
            </div>
          </article>
          <div className="sm-cards">
            {socialAccounts.map((a) => (
              <article className="ac-card" key={a.id}>
                <div className="ac-badge">Social Media · {a.cat}</div>
                <div className="ac-grid">
                  <div className="ac-body">
                    <div className="ac-title"><Highlight text={a.name} query={query} /></div>
                    <div className="ac-meta">{a.meta}</div>
                    <p className="ac-sum"><Highlight text={a.sum} query={query} /></p>
                    <div className="exp-tags">
                      {a.tags.map((t) => (
                        <span className="tag" key={t}><Highlight text={t} query={query} /></span>
                      ))}
                    </div>
                    <ul className="exp-highlights">
                      {a.highlights.map((h, i) => (
                        <li key={i}><Highlight text={h} query={query} /></li>
                      ))}
                    </ul>
                    <div className="ac-hint">{a.hint}</div>
                  </div>
                  <div className="ac-panel">
                    <button
                      className="ac-cover"
                      type="button"
                      onClick={() => setLightbox(a)}
                      title="点击放大查看完整截图"
                    >
                      <img src={a.cover} alt={a.alt} />
                      <span className="ac-zoom">点击放大 ⤢</span>
                    </button>
                    <span className="ac-kicker">Xiaohongshu · 小红书</span>
                    <span className="ac-name">{a.name}</span>
                    <span className="ac-sign">「{a.sign}」</span>
                    <div className="ac-stats">
                      {a.stats.map((m) => (
                        <div key={m.k}><b>{m.v}</b><i>{m.k}</i></div>
                      ))}
                    </div>
                    <a className="ac-go" href={a.link} target="_blank" rel="noreferrer">访问主页 →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
