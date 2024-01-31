// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/T14%20Gen%203/Documents/Cara_Car/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/T14%20Gen%203/Documents/Cara_Car/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/T14%20Gen%203/Documents/Cara_Car/vite.config.js";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? "/chd104/g6/front/" : "/",
  build: {
    outDir: "front"
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/scss/main.scss";
          `
      }
    }
  }
  // server:{
  //   host:'10.1.16.83'
  //   //這個host上傳前要清除，再要不然就是不要commit(最好直接不commit)
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUMTQgR2VuIDNcXFxcRG9jdW1lbnRzXFxcXENhcmFfQ2FyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUMTQgR2VuIDNcXFxcRG9jdW1lbnRzXFxcXENhcmFfQ2FyXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9UMTQlMjBHZW4lMjAzL0RvY3VtZW50cy9DYXJhX0Nhci92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcclxuICA/ICcvY2hkMTA0L2c2L2Zyb250LydcclxuICAvLyA/ICcvY2hkMTA0L2c2LydcclxuICA6ICcvJyxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZnJvbnQnXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgICBAaW1wb3J0IFwiLi9zcmMvYXNzZXRzL3Njc3MvbWFpbi5zY3NzXCI7XHJcbiAgICAgICAgICBgLFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gc2VydmVyOntcclxuICAvLyAgIGhvc3Q6JzEwLjEuMTYuODMnXHJcbiAgLy8gICAvL1x1OTAxOVx1NTAwQmhvc3RcdTRFMEFcdTUwQjNcdTUyNERcdTg5ODFcdTZFMDVcdTk2NjRcdUZGMENcdTUxOERcdTg5ODFcdTRFMERcdTcxMzZcdTVDMzFcdTY2MkZcdTRFMERcdTg5ODFjb21taXQoXHU2NzAwXHU1OTdEXHU3NkY0XHU2M0E1XHU0RTBEY29tbWl0KVxyXG4gIC8vIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUyxTQUFTLGVBQWUsV0FBVztBQUVsVixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIMkssSUFBTSwyQ0FBMkM7QUFNNU8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUksYUFBYSxlQUM3QixzQkFFQTtBQUFBLEVBQ0YsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
