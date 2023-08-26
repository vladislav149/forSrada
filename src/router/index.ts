import {createRouter, createWebHistory, type RouteLocationNormalized} from 'vue-router'

const StradaAuth = () => import('@/views/StradaAuth.vue')
const StradaOrders = () => import('@/views/StradaOrders.vue')
const StradaAddOrder = () => import('@/views/StradaAddOrder.vue')
const StradaE404 = () => import('@/views/StradaE404.vue')

function authGuard(to: RouteLocationNormalized) {
  if (to.meta.isNeedAuth && !localStorage.getItem('token')) {
    return {name: 'auth'}
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-yellow-500',
  routes: [
    {
      path: '/',
      name: 'auth',
      component: StradaAuth,
      meta: {isNeedHeader: false, isNeedAuth: false}
    },
    {
      path: '/orders',
      name: 'orders',
      component: StradaOrders,
      meta: {isNeedHeader: true, isNeedAuth: true}
    },
    {
      path: '/add-order',
      name: 'addOrder',
      component: StradaAddOrder,
      meta: {isNeedHeader: true, isNeedAuth: true}
    },
    {
      path: '/:any(.*)',
      name: 'E404',
      component: StradaE404,
      meta: {isNeedHeader: false, isNeedAuth: true}
    }
  ]
})

router.beforeEach(authGuard)

export default router
