export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true
  }),
  mutations: {
    triggerSideBarOpen(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
