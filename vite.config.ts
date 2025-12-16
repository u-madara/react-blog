import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-blog/',
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  build: {
    rollupOptions: {
      // 移除不再需要的 external 配置，已通过 query: '?raw', import: 'default' 正确处理 MD 文件
    },
    // 启用代码分割
    chunkSizeWarningLimit: 1000,
    // 优化依赖预构建
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 压缩选项
    minify: 'terser',
  },
  // 开发服务器优化
  server: {
    fs: {
      // 减少文件系统监听
      strict: false,
    },
  },
  // 依赖优化
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'buffer', 'gray-matter', 'marked'],
    force: true,
  },
})
