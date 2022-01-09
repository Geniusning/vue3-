// @ts-nocheck
import request from '@/utils/request'

export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

// 获取角色对应的权限
export const getRolePermissionList = (id) => {
  return request({
    url: `/role/permission/${id}`
  })
}

// 更新角色对应的权限
export const updateRolePermissionList = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
