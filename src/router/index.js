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
      component: () => import('../views/ProductListView.vue')
    },
    {
      path: '/SecondHandList',
      name: 'SecondHandList',
      component: () => import('../views/SecondHandListView.vue')
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
      path: '/Login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
  ]
})

export default router
