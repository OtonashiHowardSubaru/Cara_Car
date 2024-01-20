import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [...],
//   scrollBehavior (to, from, savedPosition) {
//     // return 期望滾動到哪個的位置
// 		// 始终滚動到頂部
//     return { top: 0 }
//   }
// })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // meta:{
      //   title: 'Cara Car',
      // }
    },
    {
      path: '/About',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ProductList',
      name: 'ProductList',
      component: () => import('../views/ProductListView.vue')
    },
    {
      path: '/Product',
      name: 'Product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/SecondHandList',
      name: 'SecondHandList',
      component: () => import('../views/SecondHandListView.vue')
    },
    {
      path: '/SecondHandSale',
      name: 'SecondHandSale',
      component: () => import('../views/SecondHandSaleView.vue')
    },
    {
      path: '/SecondHand',
      name: 'SecondHandS',
      component: () => import('../views/SecondHandView.vue')
    },
    {
      path: '/Game',
      name: 'Game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/ShopInformation',
      name: 'ShopInformation',
      component: () => import('../views/ShopInformationView.vue')
    },
    {
      path: '/MemberCenter',
      name: 'MemberCenter',
      component: () => import('../views/MemberCenterView.vue')
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/News',
      name: 'News',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/NewsArticle',
      name: 'NewsArticle',
      component: () => import('../views/NewsArticleView.vue')
    },
    {
      path: '/BackLogin',
      name: 'BackLogin',
      component: () => import('../views/BackLoginView.vue')
    },
  ]
})
//以下為上方新增meta:{title:}去更改每個頁面的頁簽名稱才需要解開註解。
// router.beforeEach(async (to, from) => {
//   if( to.meta && to.meta.title){
//       document.title = to.meta.title
//   }
// })
export default router
