<template lang="html">
  <div class="operation-log-components">
    <el-card shadow="never" class="table-box">
      <el-table
        :row-style="{height: '40px'}"
        :header-row-style="{height: '45px'}"
        :data="tableList"
        style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text">删除</el-button>
            <el-button type="text">下载</el-button>
            <el-button type="text">设置权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="12">
        <p>第{{ query.page }}页，共10页，共2344条</p>
      </el-col>
      <el-col :span="12" align="right">
        <el-pagination
          :current-page="query.page"
          :page-sizes="pageList"
          :page-size="query['per-page']"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/list'

export default {
  extends: List,
  data() {
    return {
      tableRefs: 'file-manage-table',
      pageList: [5, 10, 15, 20, 40, 100],
      createdSearch: false,
      query: {
        name: '',
        page: 1,
        size: 10
      },
      tableList: [
        { name: 11222 },
        { name: 11222 }
      ]
    }
  },
  methods: {
    search() {
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-log-components{
  padding-bottom: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
