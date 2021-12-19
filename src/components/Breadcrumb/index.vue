<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumData" :key="index">
        <span v-if="index === breadcrumData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <span class="redirect" @click="onLinkClick(item)" v-else>{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
console.log(route.matched)
// 生成数组数据
const breadcrumData = ref([])
const getBreadcrumData = () => {
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  console.log('breadcrumData', breadcrumData.value)
}
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}
// 监听路由变化
watch(
  route,
  () => {
    getBreadcrumData()
  },
  {
    immediate: true
  }
)

// 将来更换主题，所以hover也跟着变换
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
}
.redirect:hover {
  color: v-bind(linkHoverColor);
}
:deep .no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
