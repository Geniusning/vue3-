// @ts-nocheck
import path from 'path'
import i18n from '@/i18n'
/**
 * 筛选出可供搜索的路由对象
 * @param {*} routes 路由表
 * @param {*} basePath 基础路经
 * @param {*} prefixTitle
 * @returns
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = []
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 匹配动态路由不被匹配
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }

    // 存在children,迭代处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }

  return res
}
