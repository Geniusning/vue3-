<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="(item, index) in allRoleList"
        :key="index"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { getUserRole, updateRole } from '@/api/user-manager'
import { roleList } from '@/api/role'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])
const closed = () => {
  emits('update:modelValue', false)
}
const confirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  await updateRole(props.userId, roles)
  ElMessage.success('更新成功')

  emits('updateRole')
  closed()
}

// 所有角色
const allRoleList = ref([])
const getRoleList = async () => {
  allRoleList.value = await roleList()
}
getRoleList()

// 当前用户角色
const userRoleTitleList = ref([])
const getUserRoles = async () => {
  const res = await getUserRole(props.userId)
  console.log('res', res)
  userRoleTitleList.value = res.role.map((item) => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)
</script>
