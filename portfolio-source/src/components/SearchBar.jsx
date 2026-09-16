import { useMemo, useRef, useEffect, useState } from 'react'
import { searchSections } from '../data/resume'

// 从文本中截取包含关键词的片段
function makeSnippet(text, q, len = 46) {
  const lower = text.toLowerCase()
  const i = lower.indexOf(q.toLowerCase())
  if (i < 0) return ''
  const start = Math.max(0, i - Math.floor(len / 3))
  const raw = text.slice(start, start + len)
  return (start > 0 ? '…' : '') + raw + (start + len < text.length ? '…' : '')
}

// 搜索栏：按字眼定位内容（全文匹配 + 命中片段）
export default function SearchBar({ query, setQuery, goTo, variant, autoFocus }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inputRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return searchSections
      .filter((s) => s.text.toLowerCase().includes(q))
      .map((s) => ({ ...s, snippet: makeSnippet(s.text, q) }))
  }, [query])

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  // 全局 "/" 聚焦搜索
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => { if (autoFocus) inputRef.current?.focus() }, [autoFocus])

  // 跳转到命中板块：保留 query，让正文里的命中文字保持高亮
  const jump = (id) => {
    goTo(id, { keepQuery: true })
    setOpen(false)
  }

  const submit = () => {
    if (results.length) jump(results[0].id)
    else setOpen(true)
  }

  return (
    <div className={`search-wrap is-${variant}`} ref={ref}>
      <div className="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          placeholder="搜索关键词定位内容，如：小红书 / 女书 / Excel"
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
        />
        {query ? (
          <button className="sr-clear" onClick={() => { setQuery(''); setOpen(false) }} aria-label="清空">✕</button>
        ) : variant === 'hero' ? <kbd>/</kbd> : null}
      </div>

      {open && query.trim() && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="sr-empty">未找到匹配内容，换个关键词试试～</div>
          ) : (
            <>
              <div className="sr-count">命中 {results.length} 个板块</div>
              {results.map((r) => (
                <button key={r.id} className="sr-item" onClick={() => jump(r.id)}>
                  <span className="sr-main">
                    <span className="sr-label">{r.label}</span>
                    {r.snippet && <span className="sr-snip">{r.snippet}</span>}
                  </span>
                  <span className="sr-go">定位 →</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
