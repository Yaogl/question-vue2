<template lang="html">
  <div class="route-map-list-com">
    <el-card shadow="never" class="mgb20">
      <el-form label-width="100px" @submit.native.prevent>
        <el-row>
          <el-col :span="12">
            <el-form-item label="" label-width="0">
              <el-button v-if="authBtns.SUB_NETWORK_ROUTE_CREATE_BTN" @click="addRoute">添加路由</el-button>
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
          :page-sizes="pageList"
          :page-size="query['per-page']"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>

    <create-route :visible.sync="visible" :routeInfo="curRow" />
  </div>
</template>

<script>
import List from '@/components/list'
import CreateRoute from './create-route.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CreateRoute
  },
  extends: List,
  computed: {
    ...mapGetters([
      'pageList',
      'authBtns'
    ])
  },
  data() {
    return {
      createdSearch: false,
      tableList: [
        { name: 1111, data: '2019-01-01' },
        { name: 1111, data: '2019-01-01' },
        { name: 1111, data: '2019-01-01' },
        { name: 1111, data: '2019-01-01' }
      ],
      query: {
        name: '',
        page: 1,
        size: 10
      },
      visible: false,
      curRow: {}
    }
  },
  methods: {
    addRoute() {
      this.curRow = {}
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.route-map-list-com{
  padding-bottom: 20px;
}
</style>
