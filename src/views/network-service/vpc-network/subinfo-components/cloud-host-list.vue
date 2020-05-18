<template lang="html">
  <div class="cloud-host-list-com">
    <el-card shadow="never" class="mgb20">
      <el-form label-width="100px" @submit.native.prevent>
        <el-row>
          <el-col :span="24" align="right">
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
        v-loading="loading"
        style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column label="IP地址">
          <template slot-scope="scope">
            <div v-if="scope.row.addresses && scope.row.addresses.t1">
              <p v-for="(item, index) in scope.row.addresses.t1" :key="index">{{ item.addr }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="OS-EXT-AZ:availability_zone" label="区域" />
        <el-table-column prop="created" label="创建时间" />
        <el-table-column width="100" label="状态">
          <template slot-scope="scope">
            <div>
              <p v-if="scope.row.status === 'ACTIVE'" class="circle-before green">
                运行中
              </p>
              <p v-if="scope.row.status === 'SHUTOFF'" class="circle-before gray">
                关闭
              </p>
              <p v-if="scope.row.status === 'ERROR'" class="circle-before red">
                失败
              </p>
              <p v-if="!['ACTIVE', 'SHUTOFF', 'ERROR'].includes(scope.row.status)" class="circle-before gray">
                未知
              </p>
            </div>
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
import List from '@/components/list'
import { mapGetters } from 'vuex'
import { getSubnetVirtualList } from '@/api/network-service'
import { dateFormat } from '@/utils'

export default {
  extends: List,
  computed: {
    ...mapGetters([
      'pageList',
      'authBtns'
    ])
  },
  data() {
    return {
      query: {
        networkUuid: this.$route.query.network_uuid,
        name: '',
        page: 1,
        size: 10
      },
      curRow: {} // 当前编辑行数据
    }
  },
  methods: {
    fetchApi: getSubnetVirtualList,
    formatData(list) {
      list.map(item => {
        item.created = dateFormat('YYYY-mm-dd HH:MM', item.created)
      })
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
.cloud-host-list-com{
  padding-bottom: 20px;
}
</style>
