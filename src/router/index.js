import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


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
      name: 'home',
      component: HomeView,
      meta:{
        title: 'Cara Car',
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
      path: '/SecondHandList',
      name: 'SecondHandList',
      component: () => import('../views/SecondHandListView.vue'),
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
      path: '/Cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue'),
      meta:{
        title: '購物車 | Cara Car',
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
