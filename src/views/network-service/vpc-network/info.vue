<template lang="html">
  <div class="vpc-info-container">
    <el-card class="mgb20" shadow="never">
      <el-row>
        <el-col :span="5">
          <p class="item">名称：test</p>
          <p class="item">云主机数量：10</p>
          <p class="item">项目：test</p>
        </el-col>
        <el-col :span="8">
          <p class="item">ID：test</p>
          <p class="item">VPC网段：10</p>
          <p class="item">创建时间：test</p>
        </el-col>
        <el-col :span="5">
          <p class="item">状态：test</p>
          <p class="item">平台-地区：10</p>
          <p class="item">标签：<el-tag type="success" effect="dark">test</el-tag></p>
        </el-col>
        <el-col :span="5">
          <p class="item">子网数量：test</p>
          <p class="item">区域：10</p>
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

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SubnetList from './info-components/subnet-list.vue'
import RouteMapList from './info-components/route-map-list.vue'

export default {
  components: {
    SubnetList,
    RouteMapList
  },
  data() {
    return {
      value: true,
      activeName: 'first'
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
