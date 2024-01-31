import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
  ? '/chd104/g6/front/'
  // ? '/chd104/g6/'
  : '/',
  build: {
    outDir: 'front'
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/scss/main.scss";
          `,
      }
    },
  },
  server:{
    // host:'192.168.0.10'
    //這個host上傳前要清除，再要不然就是不要commit(最好直接不commit)
  }
})
