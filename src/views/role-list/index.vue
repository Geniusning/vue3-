<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          #default="{ row }"
          :label="$t('msg.role.action')"
          width="200"
          v-permission="['distributePermission']"
        >
          <el-button type="primary" @click="onDistributeClick(row)" size="mini">
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission v-model="visible" :roleId="roleId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './component/DistributePermission'
const visible = ref(false)
const roleId = ref('')
const onDistributeClick = (row) => {
  visible.value = true
  roleId.value = row.id
}

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
  console.log('allRoles.value', allRoles.value)
}
getRoleList()
watchSwitchLang(getRoleList)
</script>

<style lang="scss" scoped></style>
