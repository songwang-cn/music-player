import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      // This is the path to the src folder
      '@': '/src'
    }
  },
  assetsInclude: ['**/*.md'],
  server: {
    host: true,
    port: '1110',
    proxy: {
      '/api/': {
        target: 'https://music.163.com/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue()
  ],
})
