<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isTags } from '@/utils/tags'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const store = useStore()
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
watch(
  route,
  (to, from) => {
    console.log(to.name)
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  //  创建的时候就触发一次
  {
    immediate: true
  }
)
// 解决tagsView  国际化
// watchSwitchLang(() => {
//   store.getters.tagsViewList.forEach((route, index) => {
//     store.commit('app/changeTagsView', {
//       index,
//       tag: {
//         ...route,
//         title: getTitle(route)
//       }
//     })
//   })
// })
</script>

<style lang="scss" scoped>
.app-main {
  //  浏览器可视区域高度 100vh
  min-height: calc(100vh - 93px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
