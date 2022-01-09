<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div style="text-align: right">
        <el-button
          v-permission="['importUser']"
          type="primary"
          @click="onImportExcelClick"
          >{{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onExportExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="goToUserDetail(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button
              type="info"
              v-permission="['distributeRole']"
              @click="showRole(row)"
              size="mini"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              @click="removeUser(row)"
              v-permission="['remove']"
              type="danger"
              size="mini"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <role-dialog
      v-model="roleDialogVisible"
      :userId="userId"
      @updateRole="getListData"
    ></role-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getUserManagerList, deleteUser } from '@/api/user-manager'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import ExportToExcel from './components/Export2Excel'
import RoleDialog from './components/roleDialog'
const userId = ref('')
const roleDialogVisible = ref(false)

// 保证每次打开的dialog都是新数据
watch(roleDialogVisible, (val) => {
  if (!val) userId.value = ''
})
const showRole = (row) => {
  roleDialogVisible.value = true
  userId.value = row._id
}
const router = useRouter()
const removeUser = async (row) => {
  await deleteUser(row._id)
  ElMessage.success('删除成功')
  getListData()
}
const goToUserDetail = (id) => {
  router.push(`/user/info/${id}`)
}
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 获取数据的方法
const getListData = async () => {
  const result = await getUserManagerList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)

const handleSizeChange = (s) => {
  size.value = s
  getListData()
}
const handleCurrentChange = (num) => {
  page.value = num
  getListData()
}

const onImportExcelClick = () => {
  router.push('/user/import')
}
// 导出
const exportToExcelVisible = ref(false)
const onExportExcelClick = () => {
  exportToExcelVisible.value = true
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  ::v-deep .el-tag {
    margin-right: 6px;
  }
  .pagination {
    text-align: center;
  }
}
</style>
