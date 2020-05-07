<template lang="html">
  <div class="user-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="addNewUser">新增用户</el-button>
        <el-button type="primary">删除</el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" class="table-box">
      <el-form label-width="100px" @submit.native.prevent>
        <el-row>
          <el-col :span="12">
            <el-form-item label="每页显示：">
              <el-select v-model="query.size" placeholder="请选择" class="input-width-1" @change="changePages">
                <el-option v-for="item in pageList" :key="item" :value="item" :label="item + '条'">{{ item }}条/每页</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" align="right">
            <el-form-item label="">
              <el-input placeholder="请输入关键字搜索" v-model.trim="query.name" @keyup.enter.native="search" class="input-width-2">
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
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="状态" prop="name">
          <template slot-scope="scope">
            {{ scope.row.status === 'ACTIVE' ? '可用' : '不可用' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row style="margin: 20px;">
      <el-col :span="12">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="12" align="right">
        <el-pagination
          :current-page="query.page"
          :page-sizes="pageList"
          :page-size="query.size"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>

    <create-user :visible.sync="visible" :isEdit="isEdit" :editInfo="curRow"/>
  </div>
</template>

<script>
import List from '@/components/list'
import { getNetworkList } from '@/api/network-service'
import { mapGetters } from 'vuex'
import { dateFormat } from '@/utils'
import CreateUser from './components/create-user.vue'

export default {
  extends: List,
  components: {
    CreateUser
  },
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        name: ''
      },
      tableRefs: 'user-table',
      visible: false,
      curRow: {}, // 点击的当前行数据
      isEdit: false
    }
  },
  computed: {
    ...mapGetters([
      'pageList'
    ])
  },
  methods: {
    fetchApi: getNetworkList,
    addNewUser() {
      this.visible = true
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
.user-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
