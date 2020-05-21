<template lang="html">
  <div class="sub-vpc-info-container">
    <el-card class="mgb20" shadow="never" v-loading="loading">
      <el-form label-width="100">
        <el-row>
          <el-col :span="5">
            <el-form-item label="名称：">
              {{ subInfo.name }}
            </el-form-item>
            <el-form-item label="网段：">
              {{ subInfo.cidr }}
            </el-form-item>
            <el-form-item label="项目：">
              {{ curProjectInfo.name }}
            </el-form-item>
            <el-form-item label="网络ACL：">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="ID：">
              {{ subInfo.id }}
            </el-form-item>
            <el-form-item label="DHCP段：">
            </el-form-item>
            <el-form-item label="创建时间：">
              {{ subInfo.created_at }}
            </el-form-item>
            <el-form-item label="DNS地址：">
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属网络：">
              {{ subInfo.network_id }}
            </el-form-item>
            <el-form-item label="网关：">
              {{ subInfo.gateway_ip }}
            </el-form-item>
            <el-form-item label="地区：">
            </el-form-item>

          </el-col>
          <el-col :span="5">
            <el-form-item label="DHCP：">
              {{ subInfo.enable_dhcp ? '开启' : '关闭' }}
            </el-form-item>
            <el-form-item label="区域：">
            </el-form-item>
            <el-form-item label="删除保护：">
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
import { getSubnetInfo } from '@/api/network-service'
import { mapGetters } from 'vuex'

export default {
  components: {
    PortList,
    CloudHostList,
    VirtualIpList
  },
  computed: {
    ...mapGetters([
      'curProjectInfo'
    ])
  },
  data() {
    return {
      value: true,
      activeName: 'first',
      subInfo: {},
      loading: true
    }
  },
  created() {
    this.getSubInfo()
  },
  methods: {
    getSubInfo() {
      getSubnetInfo(this.$route.query.network_uuid).then(res => {
        this.loading = false
        this.subInfo = res.result[0]
      }).catch(err => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-vpc-info-container{
  padding: 20px 20px;
}
</style>
