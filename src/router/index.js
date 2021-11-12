import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: Home
  },
  {
    path: '/reviews',
    name: 'Отзывы',
    component: () => import('../views/Reviews.vue')
  },
  {
    path: '/order',
    name: 'Заказ',
    component: () => import('../views/Order.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
