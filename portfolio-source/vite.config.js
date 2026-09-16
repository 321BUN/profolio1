import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // 输出为普通脚本（非 ES module），这样用 file:// 双击打开也能运行
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        // 带哈希且与 app.js 同目录：iife 下资源 URL 按「脚本所在目录 + 文件名」解析
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
