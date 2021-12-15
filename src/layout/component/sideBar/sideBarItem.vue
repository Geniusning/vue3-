<template>
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <side-bar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></side-bar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './menuItem.vue'
import { defineProps } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
defineProps({
  route: {
    type: Object,
    required: true
  }
})

onBeforeRouteUpdate((to) => {
  console.log(to, '=====')
})
</script>
