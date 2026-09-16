import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Campus from './components/Campus'
import Contact from './components/Contact'
import WorkDetail from './components/WorkDetail'
import ReportDetail from './components/ReportDetail'
import Works from './components/Works'

const SECTION_IDS = ['home', 'about', 'experience', 'project', 'campus', 'works', 'contact']

const getWorkRoute = () => {
  const h = window.location.hash
  return h.startsWith('#/work/') || h.startsWith('#/report/') ? h : ''
}

export default function App() {
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [workRoute, setWorkRoute] = useState(getWorkRoute)

  // 作品详情页路由（#/work/...）；返回时恢复主站滚动位置
  useEffect(() => {
    let savedY = 0
    const onHash = () => {
      const next = getWorkRoute()
      if (next && !workRoute) { savedY = window.scrollY }
      setWorkRoute(next)
      if (!next && savedY) {
        // 回到主站后等一帧再恢复位置
        requestAnimationFrame(() => window.scrollTo(0, savedY))
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [workRoute])

  // 导航栏滚动态
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 滚动监听：高亮当前板块
  useEffect(() => {
    if (workRoute) return undefined
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [workRoute])

  // 定位到指定板块（搜索 / 导航共用）
  // keepQuery: 搜索跳转时保留关键词，让正文命中处保持高亮
  const goTo = (id, opts = {}) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (!opts.keepQuery) setQuery('')
  }

  if (workRoute) {
    return workRoute.startsWith('#/report/') ? <ReportDetail /> : <WorkDetail />
  }

  return (
    <>
      <Navbar scrolled={scrolled} active={active} query={query} setQuery={setQuery} goTo={goTo} />
      <Hero query={query} setQuery={setQuery} goTo={goTo} />
      <main>
        <About query={query} />
        <Experience query={query} />
        <Campus query={query} />
        <Works query={query} />
        <Contact />
      </main>
    </>
  )
}
