// @ts-nocheck
import { publicRoute, privateRoute } from '@/router'
export default {
  namespaced: true,
  state: () => ({
    // 初始时所拥有的路由表
    routes: publicRoute
  }),
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoute, ...newRoutes]
    }
  },
  actions: {
    // 根据权限数据筛选路由
    filterRoutes(context, menus) {
      // 筛选之后，获取到的需要通过addRoute进行添加的路由表数组
      const routes = []
      menus.forEach((key) => {
        routes.push(...privateRoute.filter((item) => item.name === key))
      })
      // 所有不匹配的路由都会会进入404,改路由必须在所有路由指定过后，也就是说要放到最后面
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
