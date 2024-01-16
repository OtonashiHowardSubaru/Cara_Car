import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 創建一個Veu應用程式
const vueApp = createApp(App)

vueApp.use(createPinia())
vueApp.use(router)

vueApp.mount('#app')
