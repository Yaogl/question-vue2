<template lang="html">
  <div class="subnet-list-com">
    <el-card shadow="never" class="mgb20">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="" label-width="0">
              <el-button @click="addSubnet">创建子网</el-button>
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
        :row-style="{height: '50px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" />
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

    <CreateSubnet :visible.sync="visible" :subhetInfo="curRow" />
  </div>
</template>

<script>
import List from '@/components/list'
import CreateSubnet from './create-subnet.vue'

export default {
  components: {
    CreateSubnet
  },
  extends: List,
  data() {
    return {
      pageList: [5, 10, 15, 20, 40, 100],
      createdSearch: false,
      query: {
        name: '',
        page: 1,
        size: 10
      },
      visible: false,
      curRow: {} // 当前编辑行数据
    }
  },
  methods: {
    addSubnet() { // 新建时清空编辑行数据
      this.curRow = {}
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.subnet-list-com{
  padding-bottom: 20px;
}
</style>
