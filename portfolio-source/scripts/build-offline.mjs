/**
 * 生成离线版：把 CSS / JS 全部内联进 index.html，
 * 产出可直接双击打开（file://）的版本，不依赖任何服务器、不联网。
 */
import fs from 'node:fs'
import path from 'node:path'

const DIST = 'dist'
const OUT = 'portfolio-offline'          // 离线版输出目录

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

let html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

// 内联 CSS
html = html.replace(/<link[^>]+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_m, href) => {
  const css = fs.readFileSync(path.join(DIST, href), 'utf8')
  return `<style>\n${css}\n</style>`
})

// 内联 JS（转义 </script> 和 <script 以免在 HTML 中误开/关 script 标签）
// 包裹 DOMContentLoaded：脚本仍在 <head>，但延迟到 DOM 解析完再执行，
// 这样 document.getElementById('root') 才能取到 <body> 里的 #root 元素
html = html.replace(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g, (_m, src) => {
  const js = fs
    .readFileSync(path.join(DIST, src), 'utf8')
    .replace(/<\/script/gi, '<\\/script')
    .replace(/<script/gi, '<\\script')
  return `<script>\nwindow.addEventListener('DOMContentLoaded',function(){\n${js}\n});\n</script>`
})

// 静态资源（public/ 下的图片、视频）已随构建复制到 dist 根目录，
// 引用方式为相对页面路径，离线目录与 dist 结构保持一致即可
fs.writeFileSync(path.join(OUT, 'index.html'), html)
const MEDIA_RE = /\.(mp4|webm|ogg|mp3|png|jpe?g|webp|svg|ico)$/i
for (const f of fs.readdirSync(DIST)) {
  if (MEDIA_RE.test(f)) fs.copyFileSync(path.join(DIST, f), path.join(OUT, f))
}

const htmlSize = fs.statSync(path.join(OUT, 'index.html')).size
console.log('离线版已生成 ->', OUT)
console.log('index.html:', (htmlSize / 1024).toFixed(0) + ' KB')
console.log('媒体文件:', fs.readdirSync(OUT).filter((f) => MEDIA_RE.test(f)).join(', ') || '（无）')