import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-blog/',
  build: {
    rollupOptions: {
      // 移除不再需要的 external 配置，已通过 as: 'raw' 正确处理 MD 文件
    },
  },
})
