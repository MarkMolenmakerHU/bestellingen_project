import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order/register/assembly',
    name: 'OrderListAssembly',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/register/OrderListAssembly.vue')
  },
  {
    path: '/order/register/information',
    name: 'OrderListInformation',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/register/OrderListInformation.vue')
  },
  {
    path: '/order/register/overview',
    name: 'OrderListOverview',
    component: () => import(/* webpackChunkName: "register" */ '../views/order/register/OrderListOverview.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
