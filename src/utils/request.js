import axios from 'axios'
import { ElMessage } from 'element-plus'

import store from '../store'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 统一注入token
    if (store.getters.token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      // 失败（请求成功，业务失败）,消息提醒
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败的提醒
  (error) => {
    console.log('error', error)
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)
export default service
