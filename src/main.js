//套件
import { createApp } from 'vue'
import { createPinia } from 'pinia'


//樣式
import './assets/sass/main.scss';


//引入主程式
import App from './App.vue'
import router from './router'

/*  創建一個vue應用程式(主要配置在app.vue)
    原先預設vueApp是app，但這邊只是單純為了好理解所以先改名
    未來基本上不做更動 */
const vueApp = createApp(App)

vueApp.use(createPinia())
vueApp.use(router)

//渲染在index.html裡面的div#app
vueApp.mount('#app')
