import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/About',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
  ]
})

export default router
