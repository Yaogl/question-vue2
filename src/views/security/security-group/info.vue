<template lang="html">
  <div class="security-group-info">
    <el-card class="mgb20" shadow="never" v-loading="loading">
      <el-form>
        <el-row>
          <el-col :span="7">
            <el-form-item label="名称：">
              {{ curSecurityInfo.name }}
            </el-form-item>
            <el-form-item label="项目：">
              开发项目
            </el-form-item>
            <el-form-item label="描述：">
              {{ curSecurityInfo.description }}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="ID：">
              {{ curSecurityInfo.id }}
            </el-form-item>
            <el-form-item label="创建时间：">
              {{ curSecurityInfo.created_at }}
            </el-form-item>
            <el-form-item label="地区：">
              开发项目
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="状态：">

            </el-form-item>
            <el-form-item label="区域：">

            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>


    <el-row class="mgb20">
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery" v-if="authBtns.SECURITY_RULE_REFRESH_BTN">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary" v-if="authBtns.SECURITY_RULE_CREATE_BTN">添加规则</el-button>
        <el-button type="primary" v-if="authBtns.SECURITY_RULE_DELETE_BTN">删除</el-button>
        </el-dropdown>
      </el-col>
    </el-row>

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
      <el-table-column label="方向" prop="direction">
        <template slot-scope="scope">
          <span v-if="scope.row.direction === 'egress'">出口</span>
          <span v-if="scope.row.direction === 'ingress'">入口</span>
        </template>
      </el-table-column>
      <el-table-column label="以太网类型" prop="ethertype" />
      <el-table-column label="IP协议" prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.protocol || '全部'  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端口范围" prop="name">
        <template slot-scope="scope">
          <span v-if="!scope.row.port_range_min && !scope.row.port_range_max">任何</span>
          <p v-else>
            <span v-if="scope.row.port_range_min !== scope.row.port_range_max">
              {{ scope.row.port_range_min + '-' + scope.row.port_range_max }}
            </span>
            <span v-if="scope.row.port_range_min === scope.row.port_range_max">
              {{ scope.row.port_range_min }}
            </span>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="源地址" prop="remote_ip_prefix"/>
      <!-- <el-table-column label="操作" prop="name">
        <template slot-scope="scope">
          <el-button type="text" v-if="authBtns.SECURITY_RULE_EDIT_BTN">修改</el-button>
          <el-button type="text" v-if="authBtns.SECURITY_RULE_COPY_BTN">复制</el-button>
          <el-button type="text" v-if="authBtns.SECURITY_RULE_DELETE_BTN">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

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
import { getSecurityRuleList } from '@/api/network-service'

export default {
  extends: List,
  data() {
    return {
      groupInfo: {},
      loading: false,
      query: {
        groupId: this.$route.query.security_group_id,
        page: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters([
      'pageList',
      'authBtns',
      'curSecurityInfo'
    ])
  },
  methods: {
    fetchApi: getSecurityRuleList
  }
}
</script>

<style lang="scss" scoped>
.security-group-info{
  padding: 20px;
}
</style>
