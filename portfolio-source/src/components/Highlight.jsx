import { Fragment } from 'react'

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 按搜索词高亮文本（大小写不敏感）
export default function Highlight({ text, query }) {
  const q = (query || '').trim()
  if (!q) return <>{text}</>
  const re = new RegExp(`(${escapeRegExp(q)})`, 'gi')
  const parts = String(text).split(re)
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase() ? (
          <mark className="hl" key={i}>{p}</mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  )
}
