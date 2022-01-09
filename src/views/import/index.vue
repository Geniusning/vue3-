<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS } from './utils.js'
import { userBatchImport } from '@/api/user-manager'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success('上传成功')
  router.push('/user/manage')
}

// 筛选数据
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
