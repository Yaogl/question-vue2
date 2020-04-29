<template lang="html">
  <div class="file-manage-components">
    <el-row class="mgb20">
      <el-col :span="24">
        <el-button @click="createFolder">创建目录</el-button>
        <el-button>上传文件</el-button>
        <el-button>设置权限</el-button>
        <el-button>删除</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>test</el-breadcrumb-item>
        <el-breadcrumb-item>文件夹1</el-breadcrumb-item>
        <el-breadcrumb-item>文件夹1</el-breadcrumb-item>
        <el-breadcrumb-item>文件夹1</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card shadow="never" class="table-box">
      <el-table
        :ref="tableRefs"
        :row-style="{height: '40px'}"
        :header-row-style="{height: '45px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
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
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="query['per-page']"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>

    <!-- <new-folder :visible.sync="visible" /> -->
    <slice-upload :visible.sync="visible" />
    <set-auth :visible.sync="visible"/>
  </div>
</template>

<script>
import List from '@/components/list'
import NewFolder from './new-folder.vue'
import SliceUpload from './slice-upload.vue'
import SetAuth from './set-auth.vue'

export default {
  extends: List,
  components: {
    NewFolder,
    SliceUpload,
    SetAuth
  },
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
      ],
      visible: false
    }
  },
  methods: {
    search() {
    },
    createFolder() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.file-manage-components{
  padding:0 20px 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
