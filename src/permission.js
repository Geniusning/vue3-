// @ts-nocheck
import router from '@/router'
import store from '@/store'

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限
        const filterRoute = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 循环添加路由
        filterRoute.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完路由后要主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
