// @ts-nocheck
import request from '@/utils/request'

export const getUserManagerList = (data) => {
  return request({
    url: `/user-manage/list?page=${data.page}&size=${data.size}`,
    method: 'GET'
  })
}

export const getUserAllList = () => {
  return request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}

export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`,
    method: 'GET'
  })
}

// 批量上传数据
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

// 删除用户
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

// 获取指定用户角色
export const getUserRole = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

// 为员工分配橘色
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
