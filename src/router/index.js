// @ts-nocheck
import { createRouter, createWebHashHistory } from 'vue-router'
// import layout from '@/layout/index'
import UserManage from './modules/UserManager'
import RoleList from './modules/RoleList'
import Permission from './modules/Permission'
import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'
import store from '../store'
// 私人路游标
export const privateRoute = [
  UserManage,
  RoleList,
  Permission,
  Article,
  ArticleCreate
]
// {
//   path: '/user',
//   component: layout,
//   redirect: '/user/manage',
//   meta: {
//     title: 'user',
//     icon: 'personnel'
//   },
//   children: [
//     {
//       path: '/user/manage',
//       name: 'userManage',
//       component: () => import('@/views/user-manage/index'),
//       meta: {
//         title: 'userManage',
//         icon: 'personnel-manage'
//       }
//     },
//     {
//       path: '/user/role',
//       name: 'userRole',
//       component: () => import('@/views/role-list/index'),
//       meta: {
//         title: 'roleList',
//         icon: 'role'
//       }
//     },
//     {
//       path: '/user/permission',
//       name: 'userPermission',
//       component: () => import('@/views/permission-list/index'),
//       meta: {
//         title: 'permissionList',
//         icon: 'permission'
//       }
//     },
//     {
//       path: '/user/info/:id',
//       name: 'userInfo',
//       component: () => import('@/views/user-info/index'),
//       props: true,
//       meta: {
//         title: 'userInfoList'
//       }
//     },
//     {
//       path: '/user/import',
//       name: 'import',
//       component: () => import('@/views/import/index'),
//       meta: {
//         title: 'excelImport'
//       }
//     }
//   ]
// },
// {
//   path: '/article',
//   component: layout,
//   redirect: '/article/ranking',
//   meta: {
//     title: 'article',
//     icon: 'article'
//   },
//   children: [
//     {
//       path: '/article/ranking',
//       name: 'articleRanking',
//       component: () => import('@/views/article-ranking/index'),
//       meta: {
//         title: 'articleRanking',
//         icon: 'article-ranking'
//       }
//     },
//     {
//       path: '/article/:id',
//       name: 'articleDetail',
//       component: () => import('@/views/article-detail/index'),
//       meta: {
//         title: 'articleDetail'
//       }
//     },
//     {
//       path: '/article/create',
//       name: 'articleCreate',
//       component: () => import('@/views/article-create/index'),
//       meta: {
//         title: 'articleCreate',
//         icon: 'article-create'
//       }
//     },
//     {
//       path: '/article/editor/:id',
//       name: 'articleEditor',
//       component: () => import('@/views/article-create/index'),
//       meta: {
//         title: 'articleEditor'
//       }
//     }
//   ]
// }
// 公共路由表
export const publicRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/profile',
    component: () => import('@/layout/index'),
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
  // 所有不匹配的路由都会会进入404,改路由必须在所有路由指定过后，也就是说要放到最后面
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: '/404'
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoute
})

// 初始化路由表
export function resetRouter() {
  console.log('resetRouter', store.getters)
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    console.log('resetRoute menus', menus)
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}
export default router
