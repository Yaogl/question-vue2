<template lang="html">
  <div class="block-storage-list-container">
    <el-row>
      <el-col :span="24">
        <el-button type="ghost" @click="clearQuery">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary" @click="jumpToCreate">
          <i class="el-icon-circle-plus-outline"></i>
          创建题目
        </el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" class="table-box">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="24" align="right">
            <el-form-item label="">
              <el-input placeholder="请输入关键字搜索" v-model.trim="query.content" @keyup.enter.native="search" class="input-width-2">
                <i slot="suffix" class="el-icon-search" @click="search"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :ref="tableRefs"
        :row-style="{height: '40px'}"
        v-loading="loading"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column label="题目" prop="content" />
        <el-table-column label="创建时间" prop="created_at" width="150px"/>
        <el-table-column label="操作" width="100px">
          <template lang="html" slot-scope="scope">
            <el-button type="text" @click="editQuestion(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="delQuestion(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row style="margin: 20px;">
      <el-col :span="8">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="16" align="right">
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
  </div>
</template>

<script>
import List from '@/components/list/backup'
import { mapGetters } from 'vuex'
import { getList, delQuestion } from '@/api/question'
import { dateFormat } from '@/utils'

export default {
  extends: List,
  computed: {
    ...mapGetters([
      'pageList'
    ])
  },
  data() {
    return {
      query: {
        content: '',
        tag: [],
        page: 1,
        size: 10
      },
      curRow: {}, // 点击的当前行数据
    }
  },
  methods: {
    fetchApi: getList,
    formatData(list) {
      list.map(item => {
        item.created_at = dateFormat('YYYY-mm-dd HH:MM', item.createtime)
      })
      return list
    },
    jumpToCreate() {
      this.$router.push('/create-question')
    },
    delQuestion(id) {
      this.$confirm('确定要删除这条题目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          delQuestion(id).then(res => {
            this.search()
          })
        })
    },
    editQuestion(id) {
      this.$router.push({
        path: '/create-question',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block-storage-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
