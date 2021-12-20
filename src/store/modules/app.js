// @ts-nocheck
import { getStorage, setStorage } from '@/utils/storage'
import { LANG } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getStorage(LANG) || 'zh'
  }),
  mutations: {
    triggerSideBarOpen(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setStorage(LANG, lang)
      state.language = lang
    }
  }
}
