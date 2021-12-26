// @ts-nocheck
import { generateColors } from '@/utils/theme'
import { getStorage } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getStorage(MAIN_COLOR))
  }),
  sideBarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
