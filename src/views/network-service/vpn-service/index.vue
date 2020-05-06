<template lang="html">
  <div class="vpn-service-container">
    <el-tabs v-model="activeTab">
       <el-tab-pane label="VPN网关" name="1">
         <VpnGateway />
       </el-tab-pane>
       <el-tab-pane label="VPN连接" name="2">
         <VpnConnect />
       </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
import VpnConnect from './tab-components/vpn-connect.vue'
import VpnGateway from './tab-components/vpn-gateway.vue'

export default {
  components: {
    VpnConnect,
    VpnGateway
  },
  data() {
    return {
      activeTab: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.vpn-service-container{
  padding: 15px;
}
</style>
