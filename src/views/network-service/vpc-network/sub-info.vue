<template lang="html">
  <div class="sub-vpc-info-container">
    <el-card class="mgb20" shadow="never">
      <el-row>
        <el-col :span="5">
          <p class="item">名称：test</p>
          <p class="item">网段：192.108.1.1</p>
          <p class="item">项目：项目</p>
          <p class="item">网络ACL：test-acl</p>
        </el-col>
        <el-col :span="8">
          <p class="item">ID：fc19288-kf1229-ff3939-io99883</p>
          <p class="item">DNS地址：192.169.01.01，192.169.01.01</p>
          <p class="item">DHCP段：192.169.01.01，192.169.01.01</p>
          <p class="item">创建时间：2019-09-09 12:12:12</p>
        </el-col>
        <el-col :span="5">
          <p class="item">所需网络：test</p>
          <p class="item">地区：北京6区</p>
          <p class="item">网关：192.169.01.01</p>
          <p class="item">区域：可用区域</p>
        </el-col>
        <el-col :span="5">
          <p class="item">DHCP：test</p>
          <p class="item">区域：10</p>
          <p class="item">删除保护：
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </p>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="activeName">
      <el-tab-pane label="网络端口" name="first">
        <port-list />
      </el-tab-pane>
      <el-tab-pane label="虚拟ip" name="second">
        <virtual-ip-list />
      </el-tab-pane>
      <el-tab-pane label="云主机" name="third">
        <cloud-host-list />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PortList from './subinfo-components/port-list.vue'
import CloudHostList from './subinfo-components/cloud-host-list.vue'
import VirtualIpList from './subinfo-components/virtual-ip-list.vue'

export default {
  components: {
    PortList,
    CloudHostList,
    VirtualIpList
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
.sub-vpc-info-container{
  padding: 20px 10px;
  .item{
    color: #666;
    line-height: 20px;
    padding: 15px 0;
  }
}
</style>
