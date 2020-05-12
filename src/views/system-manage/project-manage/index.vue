<template lang="html">
  <div class="project-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery">
          <i class="el-icon-refresh-right"></i>
          刷新
        </el-button>
        <el-button type="primary" @click="addNewProject">新增项目</el-button>
        <el-button type="primary" @click="deleteProjects">删除</el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" class="table-box">
      <el-form label-width="100px" @submit.native.prevent>
        <el-row>
          <el-col :span="12">
            <el-form-item label="每页显示：">
              <el-select v-model="query.pageSize" placeholder="请选择" class="input-width-1" @change="changePages">
                <el-option v-for="item in pageList" :key="item" :value="item" :label="item + '条'">{{ item }}条/每页</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" align="right">
            <el-form-item label="">
              <el-input placeholder="请输入关键字搜索" v-model.trim="query.projectName" @keyup.enter.native="search" class="input-width-2">
                <i slot="suffix" class="el-icon-search" @click="search"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :ref="tableRefs"
        v-loading="loading"
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="创建时间" prop="createAt" />
        <el-table-column label="操作" prop="name">
          <template slot-scope="scope">
            <el-button type="text" @click="diUser">分配用户</el-button>
            <el-button type="text" @click="delProject([scope.row.id])">删除</el-button>
            <el-button type="text" @click="editProject(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row style="margin: 20px;">
      <el-col :span="12">
        <p>第{{ query.pageNum }}页，共{{ Math.ceil(total/query.pageSize) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="12" align="right">
        <el-pagination
          :current-page="query.pageNum"
          :page-sizes="pageList"
          :page-size="query.pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>

    <create-project :visible.sync="visible" :projectInfo="curRow" @confirm="search"/>
    <divide-resources :visible.sync="resourcesVisible" />
    <divide-user :visible.sync="userVisible" />

  </div>
</template>

<script>
import List from '@/components/list/backup'
import { projectList, delProjects, getUserList } from '@/api/system-manage'
import { mapGetters } from 'vuex'
import { dateFormat } from '@/utils'
import CreateProject from './components/create-project.vue'
import DivideResources from './components/divide-resources.vue'
import DivideUser from './components/divide-user.vue'

export default {
  extends: List,
  components: {
    CreateProject,
    DivideResources,
    DivideUser
  },
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        projectName: ''
      },
      visible: false,
      curRow: {}, // 点击的当前行数据
      resourcesVisible: false,
      userVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'pageList'
    ])
  },
  created() {
    getUserList()
  },
  methods: {
    fetchApi: projectList,
    addNewProject() {
      this.visible = true
      this.curRow = {}
    },
    editProject(row) {
      this.visible = true
      this.curRow = row
    },
    resources() {
      this.resourcesVisible = true
    },
    deleteProjects() {
      if (!this.selectIds.length) {
        this.$message.warning('请选择需要删除的项目')
        return
      }
      this.delProject(this.selectIds)
    },
    delProject(list) {
      this.$confirm('确定要删除项目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delProjects(list).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.search()
          }
        })
      }).catch((err) => {})
    },
    diUser() {
      this.userVisible = true
    },
    editCur(row, name) {
      this.curRow = row
      this.componentName = name
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.project-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
