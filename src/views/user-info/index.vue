<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary">{{ $t('msg.userInfo.print') }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box">
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { userDetail } from '@/api/user-manager'
import { watchSwitchLang } from '@/utils/i18n'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id)
  console.log('userInfo', detailData.value)
}
getUserDetail()
watchSwitchLang(getUserDetail)
</script>

<style lang="scss" scoped></style>
