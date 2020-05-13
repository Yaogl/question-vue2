<template lang="html">
  <div class="block-storage-list-container">
    <el-row>
      <el-col :span="24">
        <el-button type="ghost" @click="clearQuery">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary">删除</el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" class="table-box">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="每页显示：">
              <el-select v-model="query.size" placeholder="请选择" class="input-width-1">
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
        :row-style="{height: '40px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="操作">
          <template lang="html" slot-scope="scope">
            <el-button type="text" @click="rollBack">回滚</el-button>
            <el-button type="text" @click="createDisk">创建硬盘</el-button>
            <el-button type="text">删除</el-button>
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

    <roll-back :visible.sync="visible" />
  </div>
</template>

<script>
import List from '@/components/list'
import RollBack from './list-components/roll-back.vue'

export default {
  components: {
    RollBack
  },
  extends: List,
  data() {
    return {
      pageList: [5, 10, 15, 20, 40, 100],
      createdSearch: false,
      query: {
        name: '',
        tag: [],
        page: 1,
        size: 10
      },
      tableList: [
        { name: 11222 }
      ],
      visible: false,
      curRow: {}, // 点击的当前行数据
    }
  },
  methods: {
    search() {
    },
    rollBack() {
      this.visible = true
    },
    createDisk() {
      this.$router.push('/storage-service/snapshot-create')
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
