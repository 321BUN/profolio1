// 简历内容结构化数据 —— 后续可直接在此处替换为真实文案 / 补充作品图
export const profile = {
  name: '胡彦彬',
  nameEn: 'Hu Yanbin',
  role: '游戏运营',
  roleEn: 'Game Operations',
  // Hero 大标题用的主张句
  headline: ['用内容理解用户，', '用数据驱动增长。'],
  tagline: '文化产业管理专业 · 内容 / 活动运营实战 · 重度社媒玩家',
  email: '1482963495@qq.com',
  phone: '13538980021',
  birth: '2005.02',
  location: '广州 · 暨南大学',
  intro:
    '文化产业管理专业在读，拥有 3 段内容 / 活动运营实战经历。深度理解小红书、B 站等内容生态与流量分发逻辑，擅长从数据中提炼用户偏好、将热点转化为适配游戏卖点的内容创意。长期关注 AI 工具在内容生产中的应用，乐于用新方法提效。',
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
    name: 'GenZ 亚太女书发展计划',
    nameEn: 'GenZ Asia-Pacific Nüshu Project',
    role: '内容 / 活动策划',
    period: '2023.12 – 2024.12',
    tags: ['跨界合作', '社媒运营', '文化传播'],
    summary:
      '面向年轻群体的非遗文化传播项目，负责跨界合作对接与社媒账号从 0 到 1 增长。',
    highlights: [
      '跨界合作与活动策划：参与触达数十名多领域女性杰出人物进行访谈合作，与各高校以及文化组织达成联合传播；参与女书文化主题活动策划，协助设计线上线下联动传播方案，吸引超 5000 人次参与。',
      '内容创意性生产与传播：参与后续相关推文撰写及主流社交媒体（小红书为主）的内容发布与账号运营，累计收获 4000+ 粉丝、总共 8 万获赞与收藏，具备内容调性把控与账号增长的实际经验。',
    ],
    metrics: [
      { k: '参与人次', v: '5000+' },
      { k: '粉丝', v: '4000+' },
      { k: '获赞收藏', v: '8 万' },
    ],
    cover: { hue: 280, label: '女书文化 · 联名传播视觉' },
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
]

// 游戏经历（个人画像）
export const gaming = {
  summary:
    '10 多年游戏经历，深度覆盖女性向、国风及二次元品类，日常关注游戏 UCG 内容、游戏 IP 联动、潮玩文创等跨赛道品牌合作活动。',
  titles: [
    { name: '暖暖系列', note: '无限暖暖满级' },
    { name: '恋与制作人', note: '70 级+' },
    { name: '苏丹的世界', note: '100h+' },
    { name: '一梦江湖', note: '80 级+' },
  ],
}

// 技能 / 自我评价（用于搜索命中 & 关于页补充）
export const skills = [
  {
    group: '内容能力',
    text: '熟悉剪映、PR 等视频剪辑工具以及 PS、美图秀秀、秀米、可画等制图工具；重度社媒用户，深度理解小红书、B 站各平台内容调性、流量分发逻辑与用户生态，网感好，能快速响应热点并转化为适配游戏卖点的内容创意。',
  },
  {
    group: 'AI 工具使用',
    text: '长期关注 AI 工具在内容生产中的应用以及行业新动态，熟悉 DeepSeek、豆包、Kimi 等主流模型的高效用法，熟悉豆包、即梦等图文 / 视频 AIGC 工具的使用。',
  },
  {
    group: '技能掌握',
    text: '雅思 7；熟练运用飞书等协同工具；熟练使用 Excel（VLOOKUP / 数据透视表 / 图表）。',
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
      profile.name, profile.nameEn, profile.role, profile.tagline,
      profile.intro, profile.location, profile.email,
      profile.education.school, profile.education.schoolEn, profile.education.major,
      profile.education.period, profile.education.gpa, profile.education.courses.join(' '),
    ].join(' '),
  },
  { id: 'experience', label: '实习经历', text: listText(internships) },
  { id: 'project', label: '项目经历', text: listText(projects) },
  { id: 'campus', label: '校园经历', text: listText(campus) },
  {
    id: 'gaming',
    label: '游戏经历',
    text: [gaming.summary, ...gaming.titles.map((t) => `${t.name} ${t.note}`)].join(' '),
  },
  {
    id: 'skills',
    label: '技能与评价',
    text: skills.map((s) => `${s.group} ${s.text}`).join(' '),
  },
]
