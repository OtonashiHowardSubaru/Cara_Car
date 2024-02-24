// 前後台連結頁面
// import IndexView from '@/views/IndexView.vue';

// 前台
/* 
首頁 | import Home from '@/views/HomeView.vue';
關於我們 | import About from '@/views/AboutView.vue';
最新消息 | import News from '@/views/NewsView.vue';
消息內頁 | import NewsArticle from '@/views/NewsArticleView.vue';
商品總覽 | import ProductList from '@/views/ProductListView.vue';
商品內頁 | import Product from '@/views/ProductView.vue';
二手專區 | import SecondHandList from '@/views/SecondHandListView.vue';
二手商品內頁 | import SecondHand from '@/views/SecondHandList.vue';
購物車 | import Cart from '@/views/CartView.vue';
會員註冊 | import Register from '@/views/RegisterView.vue';
會員中心 | import MemberCenter from '@/views/MemberCenterView.vue';
小遊戲 | import Game from '@/views/GameView.vue'
*/

import { createRouter, createWebHistory } from 'vue-router'
// import IndexView from '@/views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    // return 期望滾動到哪個的位置
		// 始终滚動到頂部
    return { top: 0 }
  },
  routes: [
    // {
    //   path: '/',
    //   redirect: '/Index'
    // },
    // {
    //   path: '/Index',
    //   name: 'Index',
    //   component: () => import('@/views/IndexView.vue'),
    //   meta:{title: 'Cara Car',}
    // },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      meta:{title: '首頁 | Cara Car',}
    },
    {
      path: '/About',
      name: 'About',
      component: () => import('@/views/AboutView.vue'),
      meta:{title: '關於我們 | Cara Car',}
    },
    {
      path: '/ProductList',
      name: 'ProductList',
      component: () => import('@/views/ProductListView.vue'),
      meta:{title: '商品總覽 | Cara Car',}
    },
    {
      path: '/Product/:pro_id',
      name: 'Product',
      component: () => import('@/views/ProductView.vue'),
      meta:{
        title: '商品 | Cara Car',
        // 這個要想辦法改成品名做為title
      }
    },
    {
      path:'/Product',
      redirect:'/ProductList'
    },
    {
      path: '/SecondHandList',
      name: 'SecondHandList',
      component: () => import('@/views/SecondHandListView.vue'),
      meta:{title: '二手專區 | Cara Car',}
    },
    {
      path: '/SecondHand/:sh_pro_id',
      name: 'SecondHand',
      component: () => import('@/views/SecondHandView.vue'),
      meta:{title: '二手專區 | Cara Car',}
    },
    {
      path:'/SecondHand',
      redirect:'/SecondHandList'
    },
    {
      path: '/SecondHandSale',
      name: 'SecondHandSale',
      component: () => import('@/views/SecondHandSaleView.vue'),
      meta:{title: '二手販賣 | Cara Car',}
    },
    {
      path: '/Game',
      name: 'Game',
      component: () => import('@/views/GameView.vue'),
      meta:{title: '小遊戲 | Cara Car',}
    },
    {
      path: '/ShopInformation',
      name: 'ShopInformation',
      component: () => import('@/views/ShopInformationView.vue'),
      meta:{title: '門市資訊 | Cara Car',}
    },
    {
      path: '/MemberCenter',
      name: 'MemberCenter',
      component: () => import('@/views/MemberCenterView.vue'),
      meta:{title: '會員中心 | Cara Car',}
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
      meta:{title: '會員註冊 | Cara Car',}
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: () => import('@/views/CartView.vue'),
      meta:{title: '購物車 | Cara Car',}
    },
    {
      path: '/News',
      name: 'News',
      component: () => import('@/views/NewsView.vue'),
      meta:{title: '最新消息 | Cara Car',}
    },
    {
      path: '/NewsArticle/:news_id',
      name: 'NewsArticle',
      component: () => import('@/views/NewsArticleView.vue'),
      meta:{title: '最新消息 | Cara Car',}
    },
    {
      path: '/CartPart2',
      name: 'CartPart2',
      component: () => import('@/views/CartPart2View.vue'),
      meta:{title: '填寫資料 | Cara Car',}
    },
    {
      path: '/CartPart3',
      name: 'CartPart3',
      component: () => import('@/views/CartPart3View.vue'),
      meta:{title: '完成訂單 | Cara Car',}
    },
    {
      path: '/ShCart',
      name: 'ShCart',
      component: () => import('@/views/ShCartView.vue'),
      meta:{title: '填寫資料 | Cara Car',}
    },
    {
      path: '/ShCartPart3',
      name: 'ShCartPart3',
      component: () => import('@/views/ShCartPart3View.vue'),
      meta:{title: '完成訂單 | Cara Car',}
    },
    // {
    //   path: '/BackLogin',
    //   name: 'BackLogin',
    //   component: () => import('@/views/admin/BackLogin.vue'),
    //   meta:{title: '後台登入 | Cara Car',}
    // },
    // {
    //   path: '/BackAdmin',
    //   name: 'BackAdmin',
    //   component: () => import('@/views/admin/BackAdmin.vue'),
    //   meta:{title: '權限管理 | Cara Car',}
    // },
  ]
})
//以下為上方新增meta:{title:}去更改每個頁面的頁簽名稱才需要解開註解。
router.beforeEach(async (to, from) => {
  if( to.meta && to.meta.title){
      document.title = to.meta.title
  }
})


export default router
