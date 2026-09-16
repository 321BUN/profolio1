import { reportList } from './reports'

// 简历内容结构化数据 —— 后续可直接在此处替换为真实文案 / 补充作品图
// 静态资源放 public/，用 BASE_URL 相对引用：GitHub Pages 子路径 / 本地 file:// 均可用
const B = import.meta.env.BASE_URL || './'
const portraitImg = `${B}portrait.jpg`
const nvshuCover = `${B}nvshu-cover.jpg`
const wenchuang1 = `${B}wenchuang-1.jpg`
const wenchuang2 = `${B}wenchuang-2.jpg`

export const profile = {
  name: '胡彦彬',
  nameEn: 'Hu Yanbin',
  tagline: '文化产业管理专业 · 内容 / 活动运营实战 · 重度社媒玩家',
  email: '1482963495@qq.com',
  phone: '13538980021',
  birth: '2005.02',
  location: '广州 · 暨南大学',
  // 个人介绍：一句一段
  introLines: [
    '文化产业管理专业在读，拥有 3 段内容 / 活动运营实战经历。',
    '深度理解小红书、B 站等内容生态与流量分发逻辑，擅长从数据中提炼用户偏好、将热点转化为适配游戏卖点的内容创意。',
    '长期关注 AI 工具在内容生产中的应用，乐于用新方法提效。',
  ],
  education: {
    school: '暨南大学',
    schoolEn: 'Jinan University',
    major: '文化产业管理',
    period: '2023.9 – 2027.6',
    gpa: 'GPA 3.8 · 专业前 10%',
    courses: [
      '公共关系学',
      '市场营销',
      '数字媒体产业研究',
      '跨文化传播',
      '网络编辑与策划',
      '广播电视学',
    ],
  },
}

// 实习经历
export const internships = [
  {
    id: 'exp-qunwan',
    company: '趣丸科技',
    companyEn: 'Quwan Tech',
    role: '活动运营',
    period: '2026.1 – 2026.4',
    tags: ['活动策划', '全流程推进', '竞品分析'],
    summary:
      '协助推进线上运营活动落地，主导常驻活动改版，并以竞品分析持续优化运营策略。',
    highlights: [
      '活动策划与全流程推进：协助推进 3 场线上运营活动落地，撰写活动方案策划与流程设计，统筹活动执行进度，协助跨部门资源配置；主导完成常驻活动改版，活动上线后日均流水较旧版提升 36%。',
      '内容生产与竞品分析：撰写活动文案及宣发内容，追踪同类产品的活动机制与用户反馈，输出竞品分析报告并持续优化策略，提炼可复用策略并推动落地。',
    ],
    metrics: [
      { k: '日均流水', v: '+36%' },
      { k: '落地活动', v: '3 场' },
    ],
    // 作品图占位（后续替换为真实截图）
    cover: { hue: 96, label: '常驻活动改版 · 数据看板' },
  },
  {
    id: 'exp-bigo',
    company: '欢聚集团',
    companyEn: 'JOYY · BIGO',
    role: '内容运营',
    period: '2025.6 – 2025.9',
    tags: ['内容策划', '多平台分发', '爆款内容'],
    summary:
      '独立负责产品软性内容策划与传播，跨小红书 / 抖音 / 微博分发，打造多篇爆款。',
    highlights: [
      '内容策划与传播：独立负责产品的软性内容策划与传播，累计产出 60+ 原创内容及多平台分发（小红书 / 抖音 / 微博），打造多篇爆款内容（单篇最高点赞量 7800+，浏览量 1.6w+）；跟踪各平台互动数据，依据用户反馈快速调整内容方向，具备从数据中提炼用户偏好、优化传播策略的能力。',
    ],
    metrics: [
      { k: '原创内容', v: '60+' },
      { k: '单篇最高赞', v: '7800+' },
      { k: '最高浏览', v: '1.6w+' },
    ],
    cover: { hue: 24, label: '多平台内容分发 · 爆款复盘' },
  },
]

// 项目经历
export const projects = [
  {
    id: 'proj-nvshu',
    name: 'GenZ 女书艺术发展计划',
    nameEn: 'GenZ Nüshu Art Project',
    role: '内容 / 活动策划',
    period: '2023.12 – 2024.12',
    tags: ['跨界合作', '社媒运营', '文化传播'],
    summary:
      '面向年轻群体的非遗文化传播项目，负责跨界合作对接与社媒账号从 0 到 1 增长。',
    highlights: [
      '跨界合作与活动策划：参与触达数十名多领域女性杰出人物进行访谈合作，与各高校以及文化组织达成联合传播；参与女书文化主题活动策划，协助设计线上线下联动传播方案，吸引超 5000 人次参与。',
      '内容创意性生产与传播：参与后续相关推文撰写及主流社交媒体（小红书 / B 站）的内容发布与账号运营，累计收获 5000+ 粉丝、8.4w+ 获赞，具备内容调性把控与账号增长的实际经验。',
    ],
    metrics: [
      { k: '参与人次', v: '5000+' },
      { k: '粉丝', v: '5000+' },
      { k: '获赞', v: '8.4w+' },
    ],
    cover: { hue: 280, image: nvshuCover, label: 'GenZ 女书艺术发展计划 · B 站账号主页' },
  },
]

// 校园经历
export const campus = [
  {
    id: 'campus-xc',
    org: '校宣传协会 · 传媒编辑部',
    role: '内容运营 / 活动策划',
    period: '2023.9 – 2024.6',
    summary:
      '负责协会社媒账号日常运营，参与多场宣传活动的策划、执行与视频内容制作。',
    highlights: [
      '内容运营与活动策划：负责协会社媒账号日常运营，撰写活动推文 3 篇，参与策划 5 场宣传活动并跟进执行；参与线下活动的宣传、流程设计、视频制作内容，并在公众号 / 视频号上完成内容分发。',
    ],
    metrics: [
      { k: '活动推文', v: '3 篇' },
      { k: '策划活动', v: '5 场' },
    ],
  },
  {
    id: 'campus-mengxiang',
    org: '「梦想杯」竞赛',
    role: '项目负责人',
    period: '2024.3 – 2024.5',
    summary:
      '从 0 到 1 完成产品策划与路演，获一等奖；以数据调研驱动产品优化。',
    highlights: [
      '从 0 到 1 策划：完成市场调研、竞品分析、销售数据分析，独立输出产品策划案及路演 PPT，获一等奖。',
      '数据处理与分析：通过问卷 / 访谈收集 500+ 用户反馈，反哺产品逻辑优化，锻炼了领导、组织与沟通能力。',
    ],
    metrics: [
      { k: '用户调研', v: '500+' },
      { k: '奖项', v: '一等奖' },
    ],
  },
  {
    id: 'campus-live',
    org: '广东省大学生电商直播技能大赛',
    role: '项目负责人',
    period: '2023.11 – 2023.12',
    summary:
      '以乡村扶农为主题完成电商带货实战，覆盖选品、营销策划与转化链路设计。',
    highlights: [
      '电商带货实战：基于乡村扶农主题，筛选 20+ 特色农产品制定营销策划；熟悉选品、流量运营与转化链路设计。',
    ],
    metrics: [
      { k: '特色农产品', v: '20+' },
      { k: '角色', v: '项目负责人' },
    ],
  },
]

// 文创作品集（课程实践成果）
export const portfolio = {
  id: 'pf-wenchuang',
  title: '「塔映花城」异形拼合台历',
  titleEn: 'Pagoda Mirroring the Flower City',
  role: '文创产品策划 · 小组作品',
  period: '2025.9 – 2025.12',
  tags: ['文创策划', 'IP 活化', '产品打样', '线下布展'],
  summary:
    '以 2025 年“羊城八景”之「塔映花城」为文化内核的城市文创产品策划，完成从调研到布展的全流程落地。',
  highlights: [
    '选题与文化挖掘：依托国家公园文创扶持与广州八景文化活化相关政策，立足全国独有的中轴线海珠湿地，瞄准景区“无台历类文创”的市场空白，确立“城市与自然对望”的产品立意。',
    '产品创意设计：设计六页双月异形插卡台历——日常插放底座作桌面日历，卡片背面兼具湿地科普与记事功能，年末可逐月拼合为一幅完整的广州中轴线长卷，兼具实用、观赏、收藏与礼品属性。',
    '全流程落地：完成政策研读、实地调研、PEST / SWOT 分析、插画设计、成本测算、打样量产与线下布展的完整文创开发链路。',
  ],
  images: [
    { src: wenchuang1, alt: '塔映花城台历 · 三月页实拍' },
    { src: wenchuang2, alt: '塔映花城台历 · 木质底座实拍' },
  ],
  // 作品详情页素材：视频 / 文档 / 图库
  detail: {
    intro:
      '一份完整的文创产品策划案：41 页项目手册、27 页答辩 PPT 与 8 分半项目视频，完整呈现从文化选题、市场分析、产品设计到打样布展的全过程。',
    video: { src: `${B}wenchuang-video.mp4`, poster: `${B}wc-video-poster.jpg`, label: '项目视频 · 08:32' },
    pdf: { src: `${B}wenchuang-manual.pdf`, label: '「塔映花城」项目策划手册', meta: '41 页 · 2.9 MB', pages: 41, pageImg: (n) => `${B}wc-manual-${String(n).padStart(2, '0')}.jpg` },
    ppt: {
      src: `${B}wenchuang-ppt.pptx`,
      label: '“塔映花城”异形台历项目策划（答辩 PPT）',
      meta: '27 页 · 11 MB',
      pages: 27,
      pageImg: (n) => `${B}wc-ppt/${String(n).padStart(2, '0')}.jpg`,
    },
    gallery: [
      { src: `${B}wc-page-cover.jpg`, alt: '手册封面 · 塔映花城', tag: '手册封面' },
      { src: `${B}wc-poster.jpg`, alt: '项目宣传海报', tag: '宣传海报' },
      { src: `${B}wc-poster2.jpg`, alt: '项目说明海报', tag: '说明海报' },
      { src: `${B}wc-page-concept.jpg`, alt: '产品创意设计方案', tag: '创意设计' },
      { src: `${B}wc-page-design.jpg`, alt: '六页物象设计方案', tag: '物象设计' },
      { src: `${B}wc-page-illustration.jpg`, alt: '插页叙事举例', tag: '插画叙事' },
      { src: `${B}wc-page-overview.jpg`, alt: '项目概述与目标要素', tag: '项目概述' },
      { src: `${B}wc-page-toc.jpg`, alt: '手册目录', tag: '目录' },
      { src: `${B}wc-page-exhibition.jpg`, alt: '布展说明', tag: '布展' },
      { src: wenchuang1, alt: '台历实拍 · 三月页', tag: '产品实拍' },
      { src: wenchuang2, alt: '台历实拍 · 木质底座', tag: '产品实拍' },
    ],
  },
}

// 游戏经历（个人画像，按品类分组）
export const gaming = {
  summary:
    '10 多年游戏经历，覆盖换装、乙女向、开放世界 RPG、卡牌与 ACT 等品类，日常关注游戏 UCG 内容、游戏 IP 联动、潮玩文创等跨赛道品牌合作活动。',
  categories: [
    {
      cat: '换装游戏',
      items: [
        {
          name: '暖暖系列',
          note: '暖暖环游世界 / 奇迹暖暖 / 闪耀暖暖 / 无限暖暖 · 无限暖暖搭配师等级满级，PC 端 200h+、安卓平板端 1000h+，累计充值约 100 元（主要用于版本礼包），剧情已推进至最新章节',
          report: { id: 'nikki', label: '《无限暖暖》拆解报告' },
        },
      ],
    },
    {
      cat: '乙女向游戏',
      items: [
        { name: '恋与制作人', note: '70 级+ · 总游玩时长 500h+' },
      ],
    },
    {
      cat: '开放世界 RPG',
      items: [
        {
          name: '原神',
          note: '冒险等阶 40 级+ · 游玩时长 300h+ · 蒙德 / 璃月 / 霜月 / 至冬剧情推进完毕',
          report: { id: 'genshin', label: '《原神》拆解报告' },
        },
        { name: '洛克王国：世界', note: '50 级+ · 游玩时长 300h+' },
      ],
    },
    {
      cat: 'MOBA',
      items: [
        { name: '王者荣耀', note: '游玩时长 1000h+ · 5 个以上账号均满级 · 最高段位王者' },
      ],
    },
    {
      cat: '卡牌游戏',
      items: [
        { name: '苏丹的游戏', note: '游玩时长 300h+ · 达成约 50 种结局' },
      ],
    },
    {
      cat: 'ACT 游戏',
      items: [
        { name: '双人成行', note: '全通关' },
      ],
    },
  ],
}

// 技能 / 自我评价（用于搜索命中 & 关于页补充）
// lines：一句一段，分号结尾
export const skills = [
  {
    group: '内容能力',
    lines: [
      '熟悉剪映、PR 等视频剪辑工具，以及 PS、美图秀秀、秀米、可画等制图工具；',
      '重度社媒用户，深度理解小红书、B 站等平台的内容调性、流量分发逻辑与用户生态；',
      '网感好，能快速响应热点，并将其转化为契合品牌与产品卖点的内容创意。',
    ],
  },
  {
    group: 'AI 工具使用',
    lines: [
      '长期关注 AI 工具在内容生产中的应用，以及行业新动态；',
      '熟悉 DeepSeek、豆包、Kimi、WorkBuddy 等主流模型的高效用法；',
      '熟悉豆包、即梦等图文 / 视频 AIGC 工具的使用。',
    ],
  },
  {
    group: '技能掌握',
    lines: [
      '雅思 7，熟练掌握英语听说读写能力；',
      '熟练掌握钉钉、飞书、WPS 文档等协同工具的应用；',
      '熟练使用 Excel（VLOOKUP / 数据透视表 / 图表），具备数据处理与分析能力，有效支持决策优化。',
    ],
  },
  {
    group: '协调沟通',
    lines: [
      '严谨细致，善于沟通交流；',
      '能高效处理多线程任务，具备良好的跨团队协作意识。',
    ],
  },
]

// 把一段经历 / 项目对象拼成可搜索的纯文本
function itemText(it) {
  const parts = [
    it.company, it.companyEn, it.name, it.nameEn, it.org,
    it.role, it.period, it.summary,
    ...(it.tags || []),
    ...(it.highlights || []),
    ...((it.metrics || []).map((m) => `${m.k} ${m.v}`)),
  ]
  return parts.filter(Boolean).join(' ')
}

const listText = (list) => list.map(itemText).join(' ')

// 搜索可定位的内容区块：id 对应各 section，text 为该区块的全文索引
// —— 这样搜索正文里出现的任意字眼（如「爆款」「1.6w」「VLOOKUP」）都能命中
export const searchSections = [
  {
    id: 'about',
    label: '个人信息',
    text: [
      profile.name, profile.nameEn, profile.tagline,
      ...profile.introLines, profile.location, profile.email,
      profile.education.school, profile.education.schoolEn, profile.education.major,
      profile.education.period, profile.education.gpa, profile.education.courses.join(' '),
    ].join(' '),
  },
  { id: 'experience', label: '实习经历', text: listText(internships) },
  { id: 'project', label: '项目经历', text: listText(projects) },
  { id: 'campus', label: '校园经历', text: campus.map(itemText).join(' ') },
  {
    id: 'works',
    label: '作品集',
    text: [
      itemText(portfolio),
      ...reportList.map((r) => `${r.title} ${r.game} ${r.sub} ${r.summary} ${r.toc.join(' ')}`),
    ].join(' '),
  },
  {
    id: 'gaming',
    label: '游戏经历',
    text: [
      gaming.summary,
      ...gaming.categories.flatMap((c) => [
        c.cat,
        ...c.items.map((t) => `${t.name} ${t.note}`),
      ]),
    ].join(' '),
  },
  {
    id: 'skills',
    label: '技能与评价',
    text: skills.map((s) => `${s.group} ${s.lines.join(' ')}`).join(' '),
  },
]
