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
      path: '/ProductView',
      name: 'ProductView',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/Test',
      name: 'Test',
      component: () => import('../views/Test.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
<<<<<<< HEAD
      path: '/Product',
      name: 'Product',
      component: () => import('../views/Product.vue')
=======
      path: '/BackLogin',
      name: 'BackLogin',
      component: () => import('../views/BackLoginView.vue')
>>>>>>> 50192e22764fc85b30ea219f75ab559af2d781d8
    },
  ]
})

export default router
