<template>
  <el-menu
    :collapse="!$store.getters.sideBarOpened"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :default-active="activeRoute"
    router
  >
    <side-bar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></side-bar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
// import { Location, Setting } from '@element-plus/icons'
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SideBarItem from './sideBarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  // console.log('fRoutes', fRoutes)
  return generateMenus(fRoutes)
})

// 默认激活
const route = useRoute()
console.log('default route', route.path)
const activeRoute = computed(() => {
  const { path } = route
  return path
})
</script>
