import { defineConfig } from 'vite'
// import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/sass/index";`
      }
    }
  }
})
