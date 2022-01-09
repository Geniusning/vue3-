<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :props="defaultProps"
      :data="allPermission"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    ></el-tree>
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
import { permissionList } from '@/api/permission'
import { getRolePermissionList, updateRolePermissionList } from '@/api/role'
import { ElMessage } from 'element-plus'
const treeRef = ref(null)
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])
const closed = () => {
  emits('update:modelValue', false)
}
const confirm = async () => {
  await updateRolePermissionList({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success('更新成功')

  emits('updateRole')
  closed()
}

const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
  console.log('allPermission', allPermission.value)
}
getPermissionList()

// 当前角色的权限

const getUserPermission = async () => {
  const checkedKeys = await getRolePermissionList(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) getUserPermission()
  }
)
</script>
