import { useEffect, useRef } from 'react'

const base = import.meta.env.BASE_URL || './'
const TOTAL = 20        // 关键帧 + 插值帧总数
const RAISE_END = 10    // 0..9 为「抬手 + wink」阶段
const WAVE_START = 10   // 10..19 为挥手循环
const FRAME_MS = 62     // ≈16fps，连续播放而非两张图硬切

export default function QChar({ name }) {
  const box = useRef(null)
  const imgs = useRef([])
  const cur = useRef(0)
  const mode = useRef('idle') // idle -> enter -> wave -> leave -> idle
  const wavePos = useRef(0)
  const tapped = useRef(false)

  const show = (i) => {
    for (let k = 0; k < TOTAL; k += 1) {
      const el = imgs.current[k]
      if (el) el.style.opacity = k === i ? '1' : '0'
    }
    cur.current = i
  }

  const mq = (q) => {
    try { return window.matchMedia(q).matches } catch (e) { return false }
  }

  useEffect(() => {
    if (mq('(prefers-reduced-motion: reduce)')) return
    const timer = window.setInterval(() => {
      const m = mode.current
      const i = cur.current
      if (m === 'enter') {
        if (i < RAISE_END - 1) show(i + 1)
        else { mode.current = 'wave'; wavePos.current = 0; show(WAVE_START) }
      } else if (m === 'wave') {
        wavePos.current = (wavePos.current + 1) % (TOTAL - WAVE_START)
        show(WAVE_START + wavePos.current)
      } else if (m === 'leave') {
        if (i > 0) show(i - 1)
        else { mode.current = 'idle'; box.current?.classList.remove('is-greeting') }
      }
    }, FRAME_MS)
    return () => window.clearInterval(timer)
  }, [])

  const start = () => {
    box.current?.classList.add('is-greeting')
    if (mq('(prefers-reduced-motion: reduce)')) { show(RAISE_END - 1); return }
    if (mode.current === 'idle' || mode.current === 'leave') mode.current = 'enter'
  }
  const stop = () => {
    box.current?.classList.remove('is-greeting')
    if (mq('(prefers-reduced-motion: reduce)')) { show(0); return }
    if (mode.current === 'wave') { show(RAISE_END - 1); mode.current = 'leave' }
    else if (mode.current === 'enter') mode.current = 'leave'
  }
  const toggle = () => {
    if (mq('(hover: hover)')) return // 桌面端由悬停控制，点击只给触屏用
    tapped.current = !tapped.current
    if (tapped.current) start(); else stop()
  }

  return (
    <div
      className="portrait qchar"
      ref={box}
      tabIndex={0}
      role="img"
      aria-label={`${name} 的 Q 版人物形象，鼠标悬停会举手 wink 打招呼`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      onClick={toggle}
    >
      <span className="q-shadow" aria-hidden="true" />
      <div className="q-stack">
        {Array.from({ length: TOTAL }, (_, i) => (
          <img
            key={i}
            ref={(el) => { imgs.current[i] = el }}
            className="q-frame"
            src={`${base}qchar/${String(i).padStart(2, '0')}.webp`}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        ))}
      </div>
    </div>
  )
}
