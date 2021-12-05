// @ts-nocheck
import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/layout/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoute
})

export default router
