/**
 * 生成离线版：把 CSS / JS 全部内联进 index.html，
 * 产出可直接双击打开（file://）的版本，不依赖任何服务器、不联网。
 */
import fs from 'node:fs'
import path from 'node:path'

const DIST = 'dist'
const OUT = 'portfolio-offline'          // 离线版输出目录
const VIDEO = 'hero.mp4'

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

// 视频保持同目录相对引用
fs.writeFileSync(path.join(OUT, 'index.html'), html)
if (fs.existsSync(path.join(DIST, VIDEO))) {
  fs.copyFileSync(path.join(DIST, VIDEO), path.join(OUT, VIDEO))
}

const htmlSize = fs.statSync(path.join(OUT, 'index.html')).size
console.log('离线版已生成 ->', OUT)
console.log('index.html:', (htmlSize / 1024).toFixed(0) + ' KB')
console.log('外部依赖:', (html.match(/src="\.\//g) || []).length, '（仅 hero.mp4 视频）')
