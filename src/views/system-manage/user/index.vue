<template lang="html">
  <div class="user-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery">
          <i class="el-icon-refresh-right"></i>
          刷新
        </el-button>
        <el-button type="primary" @click="addNewUser">新增角色</el-button>
        <el-button type="primary" @click="deleteRoles">删除</el-button>
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
              <el-input placeholder="请输入关键字搜索" v-model.trim="query.roleName" @keyup.enter.native="search" class="input-width-2">
                <i slot="suffix" class="el-icon-search" @click="search"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :ref="tableRefs"
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        v-loading="loading"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="创建时间" prop="createAt" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="resources(scope.row)">分配资源</el-button>
            <el-button type="text" @click="divideUser(scope.row)">分配用户</el-button>
            <el-button type="text" @click="editRole(scope.row)">修改</el-button>
            <el-button type="text" @click="delRole([scope.row.id])">删除</el-button>
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
    <divide-resources :visible.sync="resourcesVisible" :roleInfo="curRow" :resourceList="resourceList"/>
    <divide-user :visible.sync="userVisible" :userIds="curUserIds" :roleId="curRow.id" />
    <create-user :visible.sync="visible" :roleInfo="curRow"/>
  </div>
</template>

<script>
import List from '@/components/list/backup'
import { roleList, delRole, getRoleResource, getUserList, getRoleUser } from '@/api/system-manage'
import { mapGetters, mapActions } from 'vuex'
import { dateFormat } from '@/utils'
import CreateUser from './components/create-user.vue'
import DivideResources from './components/divide-resources.vue'
import DivideUser from './components/divide-user.vue'

export default {
  extends: List,
  components: {
    CreateUser,
    DivideResources,
    DivideUser
  },
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        roleName: ''
      },
      tableRefs: 'user-table',
      visible: false,
      curRow: {}, // 点击的当前行数据
      resourcesVisible: false,
      userVisible: false,
      operateLoading: false,
      resourceList: [], // 当前列表分配资源的id
      curUserIds: [] // 当前点击行绑定的用户id列表
    }
  },
  computed: {
    ...mapGetters([
      'pageList'
    ])
  },
  created() {
    this.setAllUserList().then(res => {
      this.operateLoading = false
    })
  },
  methods: {
    ...mapActions([
      'setAllUserList'
    ]),
    fetchApi: roleList,
    addNewUser() {
      this.curRow = {}
      this.visible = true
    },
    editRole(row) {
      this.curRow = row
      this.visible = true
    },
    deleteRoles() {
      if (!this.selectIds.length) {
        this.$message.warning('请选择需要删除的角色')
        return
      }
      this.delRole(this.selectIds)
    },
    delRole(list) {
      this.$confirm('确定要删除项目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delRole(list).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.search()
          }
        })
      }).catch((err) => {})
    },
    editCur(row, name) {
      this.curRow = row
      this.componentName = name
      this.visible = true
    },
    divideUser(row) {
      if (this.operateLoading) return this.$message.warning('资源加载中，请稍后')
      this.curRow = row
      this.operateLoading = true
      getRoleUser(row.id).then(res => {
        this.curUserIds = res.result.list.map(item => Number(item.uuid))
        this.operateLoading = false
        this.userVisible = true
      }).catch(err => {
        this.operateLoading = false
      })
    },
    resources(row) {
      if (this.operateLoading) return
      this.operateLoading = true
      this.curRow = row
      getRoleResource(row.id).then(res => {
        this.resourceList = res.result.list.map(item => item.resourceId + '')
        this.resourcesVisible = true
        this.operateLoading = false
      }).catch(err => {
        this.operateLoading = false
      })
    },
    formatData(list) {
      list.forEach(item => {
        item.createAt = dateFormat('YYYY-mm-dd HH:MM:SS', item.createAt)
      })
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
