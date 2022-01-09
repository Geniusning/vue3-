// @ts-nocheck
import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manager',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      name: 'userRole',
      component: () => import('@/views/role-list/index'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
