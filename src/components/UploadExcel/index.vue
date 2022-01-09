<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="upload-excel-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.prevent="handleDrop"
      @dropover.prevent="handleDragover"
    >
      <el-icon><upload-filled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './util.js'
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})
const loading = ref(false)
const excelUploadInput = ref(null)

const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
// 触发上传事件
const upload = (rawFile) => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前的回调，那么只有返回true的时候，才会执行对应的后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
// 异步读取数据
const readerData = (rawFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 读取操作完成时触发
    reader.onload = (e) => {
      // 1.获取到解析后的数据
      const data = e.target.result
      // 2.利用xlsx对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3.获取第一张表格名称
      const firstSheetName = workbook.SheetNames[0]
      // 4.读取sheet1的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5.解析数据表头
      const header = getHeaderRow(worksheet)
      // 6.解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7.传入解析之后的数据
      generateData({ header, results })
      // 8.处理loading
      loading.value = false
      // 9.成功回调
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
// 根据导入内容，生成数据
const generateData = (excelData) => {
  console.log('excelData1', excelData)
  props.onSuccess && props.onSuccess(excelData)
}

// 拖拽上传
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return
  console.log('e', e)
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须上传一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是.xlsx,.xls,.csv格式')
    return
  }
  upload(rawFile)
}
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .upload-excel-input {
    display: none;
    z-index: 9999;
  }
  .btn-upload,
  .drop {
    border: 1px solid #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    align-items: center;
    margin-left: 4px;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
