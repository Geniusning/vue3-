<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermission"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('msg.permission.name')"
          prop="permissionName"
          width="180"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.mark')"
          prop="permissionMark"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.permission.desc')"
          prop="permissionDesc"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
/**
 * 权限分级
 * 1.一级权限为页面的权限 路由权限
 * 2. 二级权限为功能的权限
 */
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
  console.log('allPermission.value', allPermission.value)
}
getPermissionList()
watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
