<template>
  <div class="app">
    <div>
      <el-table
        :data="state.userList"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        stripe
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" prop="id" width="80" />
        <el-table-column label="账号" prop="username" width="200" />
        <el-table-column label="昵称" prop="nickname" width="200" />
        <el-table-column label="状态" prop="is_active" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :page-size="10"
        :total="state.total"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getUserList } from './api/service'

export default defineComponent({
  name: 'App',
  setup: function () {
    const state = reactive({
      userList: [],
      params: {
        page: 1,
        page_size: 10,
      },
      total: 0,
    })

    const handleSearch = async (): Promise<void> => {
      try {
        const data: any = await getUserList(state.params)
        state.userList = data.data.results
        state.total = data.data.count
      } catch (e) {
        console.error(e)
      }
    }

    handleSearch()
    return {
      state,
      handleSearch,
    }
  },
})
</script>

<style scoped>
.pagination {
  text-align: right;
  margin-top: 12px;
}
</style>
