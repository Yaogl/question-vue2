<template lang="html">
  <div class="dashboard-container">
    <el-alert
     :title="welcomeText"
     type="success"
     center
     show-icon>
   </el-alert>
    <el-tabs v-model="activeTab">
       <el-tab-pane label="资源概况" name="1">
         <resource-overview />
       </el-tab-pane>
       <el-tab-pane label="配额信息" name="2">
         <quota-info />
       </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
import QuotaInfo from './quota-info.vue'
import ResourceOverview from './resource-overview.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuotaInfo,
    ResourceOverview
  },
  computed: {
    ...mapGetters([
      'loginTime'
    ]),
    welcomeText() {
      return `欢迎使用长城云服务平台，您本次的登录时间为 ${this.loginTime}`
    }
  },
  data() {
    return {
      activeTab: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container /deep/{
  padding: 15px;
  .el-tabs__item{
    font-weight: 600;
    font-size: 18px;
  }
  .el-alert{
    padding: 12px 16px;
    margin: 10px 0;
  }
}
</style>
