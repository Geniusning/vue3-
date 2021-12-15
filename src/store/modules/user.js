// @ts-nocheck
import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setStorage, getStorage, clearAllStorage } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'
import router from '@/router'
export default {
  namespaced: true,
  state: () => ({
    token: getStorage(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setStorage(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            // 保存登录时间
            setTimeStamp()
            router.push({
              name: 'home'
            })
            this.commit('user/setToken', res.token)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      clearAllStorage()
      // todo 权限相关内容
      router.push('/login')
    }
  }
}
