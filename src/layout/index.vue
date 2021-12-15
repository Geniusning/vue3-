<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sideBarOpened ? 'openSideBar' : 'hideSidebar']"
  >
    <sideBar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></sideBar>
    <div class="main-container">
      <div class="fixed-header">
        <navBar />
      </div>
      <app-Main></app-Main>
    </div>
  </div>
</template>

<script setup>
import SideBar from './component/sideBar'
import NavBar from './component/navBar.vue'
import AppMain from './component/appMain.vue'
import variables from '@/styles/variables.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - #{$sideBarWidth});
  z-index: 9;
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
