<template lang="html">
  <div class="vpc-info-container">
    <el-card class="mgb20" shadow="never">
      <el-row>
        <el-col :span="5">
          <p class="item">名称：{{ networkInfo.name }}</p>
          <p class="item">云主机数量：{{ networkInfo.instance_num }}</p>
          <p class="item">项目：开发项目</p>
        </el-col>
        <el-col :span="8">
          <p class="item">ID：{{ networkInfo.id }}</p>
          <p class="item">VPC网段：{{ networkInfo.segmentation_id }}</p>
          <p class="item">创建时间：{{ networkInfo.created_at }}</p>
        </el-col>
        <el-col :span="5">
          <p class="item">状态：{{ networkInfo.status === 'ACTIVE' ? '可用' : '不可用' }}</p>
          <p class="item">平台-地区：</p>
          <!-- <p class="item">标签：<el-tag type="success" effect="dark">test</el-tag></p> -->
        </el-col>
        <el-col :span="5">
          <p class="item">子网数量：{{ networkInfo.subnet_num }}</p>
          <p class="item">区域：</p>
          <p class="item">删除保护：
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </p>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="activeName">
      <el-tab-pane label="子网" name="first">
        <subnet-list />
      </el-tab-pane>
      <el-tab-pane label="路由表" name="second">
        <route-map-list />
      </el-tab-pane>
      <el-tab-pane label="拓扑图" name="third">
        <topo />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SubnetList from './info-components/subnet-list.vue'
import RouteMapList from './info-components/route-map-list.vue'
import Topo from './info-components/topo.vue'
import { getVpnNetWorkInfo } from '@/api/network-service'

export default {
  components: {
    SubnetList,
    RouteMapList,
    Topo
  },
  data() {
    return {
      value: true,
      activeName: 'first',
      networkInfo: {}
    }
  },
  created() {
    this.getNetWorkInfo()
  },
  methods: {
    getNetWorkInfo() {
      getVpnNetWorkInfo(this.$route.query.network_uuid).then(res => {
        this.networkInfo = res.result[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vpc-info-container{
  padding: 20px 20px;
  .item{
    color: #666;
    line-height: 20px;
    padding: 15px 0;
  }
}
</style>
