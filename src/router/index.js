import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/IndexView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    // return 期望滾動到哪個的位置
		// 始终滚動到頂部
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Index',
      component: HomeView,
      meta:{
        title: '首頁 | Cara Car',
      }
    },
    {
      path: '/About',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
      meta:{
        title: '關於我們 | Cara Car',
      }
    },
    {
      path: '/ProductList',
      name: 'ProductList',
      component: () => import('../views/ProductListView.vue'),
      meta:{
        title: '商品總覽 | Cara Car',
      }
    },
    {
      path: '/Product',
      name: 'Product',
      component: () => import('../views/ProductView.vue'),
      meta:{
        title: '商品明細 | Cara Car',
        // 這個要想辦法改成品名做為title
      }
    },
    {
      path: '/SecondHandList',
      name: 'SecondHandList',
      component: () => import('../views/SecondHandListView.vue'),
      meta:{
        title: '二手專區 | Cara Car',
      }
    },
    {
      path: '/SecondHand',
      name: 'SecondHand',
      component: () => import('../views/SecondHandView.vue'),
      meta:{
        title: '二手專區 | Cara Car',
      }
    },
    {
      path: '/Game',
      name: 'Game',
      component: () => import('../views/GameView.vue'),
      meta:{
        title: '小遊戲 | Cara Car',
      }
    },
    {
      path: '/ShopInformation',
      name: 'ShopInformation',
      component: () => import('../views/ShopInformationView.vue'),
      meta:{
        title: '門市資訊 | Cara Car',
      }
    },
    {
      path: '/MemberCenter',
      name: 'MemberCenter',
      component: () => import('../views/MemberCenterView.vue'),
      meta:{
        title: '會員中心 | Cara Car',
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
      meta:{
        title: '會員註冊 | Cara Car',
      }
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
      meta:{
        title: '購物車 | Cara Car',
      }
    },
    {
      path: '/News',
      name: 'News',
      component: () => import('../views/NewsView.vue'),
      meta:{
        title: '最新消息 | Cara Car',
      }
    },
    {
      path: '/NewsArticle',
      name: 'NewsArticle',
      component: () => import('../views/NewsArticleView.vue'),
      meta:{
        title: '最新消息 | Cara Car',
      }
    },
  ]
})
//以下為上方新增meta:{title:}去更改每個頁面的頁簽名稱才需要解開註解。
router.beforeEach(async (to, from) => {
  if( to.meta && to.meta.title){
      document.title = to.meta.title
  }
})
export default router
