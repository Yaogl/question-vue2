<template lang="html">
  <div class="port-list-sub-com">
    <el-card shadow="never" class="mgb20">
      <el-form label-width="100px">
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
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="fixed_ips" label="IP地址">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.fixed_ips" :key="index">{{ item.ip_address }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="device_owner" label="类型" />
        <el-table-column prop="mac_address" label="MAC地址" />
        <el-table-column prop="created_at" label="创建时间" />
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
  </div>
</template>

<script>
import List from '@/components/list'
import { mapGetters } from 'vuex'
import { getSubnetPortList } from '@/api/network-service'

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
        networkUuid: this.$route.query.network_uuid,
        page: 1,
        size: 10
      }
    }
  },
  created() {
  },
  methods: {
    fetchApi: getSubnetPortList,
  }
}
</script>

<style lang="scss" scoped>
.port-list-sub-com{
  padding-bottom: 20px;
}
</style>
