// @ts-nocheck
import variable from '@/styles/variables.scss'
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => variable,
  sideBarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language
}

export default getters
