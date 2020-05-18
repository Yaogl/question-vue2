<template lang="html">
  <div class="subnet-list-com">
    <el-card shadow="never" class="mgb20">
      <el-form label-width="100px" @submit.native.prevent>
        <el-row>
          <el-col :span="12">
            <el-form-item label="" label-width="0">
              <el-button @click="addSubnet" v-if="authBtns.SUB_NETWORK_CREATE_BTN">创建子网</el-button>
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
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <el-button type="text" :disabled="!authBtns.SUB_NETWORK_INFO_BTN" @click="toSubInfo(scope.row)">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态" />
        <el-table-column prop="cidr" label="网段" />
        <el-table-column prop="gateway_ip" label="网关" />
        <el-table-column prop="" label="DNS地址" />
        <el-table-column prop="enable_dhcp" label="DHCP状态">
          <template slot-scope="scope">
            {{ scope.row.enable_dhcp ? '开' : '关' }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="authBtns.SUB_NETWORK_EDIT_BTN">修改</el-button>
            <el-button type="text" v-if="authBtns.SUB_NETWORK_DELETE_BTN">删除</el-button>
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

    <CreateSubnet :visible.sync="visible" :subhetInfo="curRow" />
  </div>
</template>

<script>
import List from '@/components/list'
import CreateSubnet from './create-subnet.vue'
import { getSubnetListInfo } from '@/api/network-service'
import { mapGetters } from 'vuex'

export default {
  components: {
    CreateSubnet
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
      query: {
        network_uuid: '',
        name: '',
        page: 1,
        size: 10
      },
      createdSearch: false,
      visible: false,
      curRow: {} // 当前编辑行数据
    }
  },
  created() {
    this.query.networkUuid = this.$route.query.network_uuid
    this.search()
  },
  methods: {
    fetchApi: getSubnetListInfo,
    toSubInfo(row) {
      this.$router.push({
        path: '/network-service/vpc-network-sub-info',
        query: {
          network_uuid: row.id
        }
      })
    },
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
