<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserAllList } from '@/api/user-manager'
import { USER_RELATIONS } from './export2ExcelConstant.js'
import { dateFilter } from '@/filters'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue', false)
}
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserAllList()).list
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // 表头
    header: ['姓名', '联系方式', '角色', '开通时间'],
    // 数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
  })
  closed()
}
// 当使用export_json_to_excel时，传递的data要是二维数组
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色单独处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((item) => item.title))
      }
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }

      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
