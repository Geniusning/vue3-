// @ts-nocheck
import { getStorage, setStorage } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getStorage(LANG) || 'zh',
    tagsViewList: getStorage(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSideBarOpen(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setStorage(LANG, lang)
      state.language = lang
    },
    // 添加tag
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        setStorage(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 为指定的tag修改title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setStorage(TAGS_VIEW, state.tagsViewList)
    },
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setStorage(TAGS_VIEW, state.tagsViewList)
    }
  }
}
