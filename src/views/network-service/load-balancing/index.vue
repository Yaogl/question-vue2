<template lang="html">
  <div class="load-balancing-container">
    <el-tabs v-model="activeTab">
       <el-tab-pane label="负载均衡器" name="1">
         <load-balancing-list />
       </el-tab-pane>
       <el-tab-pane label="证书管理" name="2">
         <certificate-manage />
       </el-tab-pane>
       <el-tab-pane label="IP地址组" name="3">
         <address-list />
       </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
import AddressList from './tab-components/address-list.vue'
import CertificateManage from './tab-components/certificate-manage.vue'
import LoadBalancingList from './tab-components/load-balancing-list.vue'

export default {
  components: {
    AddressList,
    CertificateManage,
    LoadBalancingList
  },
  data() {
    return {
      activeTab: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.load-balancing-container{
  padding: 15px;
}
</style>
