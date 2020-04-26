<template lang="html">
  <div class="cloud-host-info-conotainer">
    <el-row class="batch-handle-row">
      <i class="el-icon-refresh-right mgr20"></i>
      <el-button type="primary">开机</el-button>
      <el-button type="primary">关机</el-button>
      <el-button type="primary">重启</el-button>
      <el-select v-model="query.value" placeholder="请选择">
        <el-option
          v-for="item in moreOperate"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>

    <el-row class="cloud-host-info">
      <el-col :span="7">
        <div class="left-card">
          <p class="title">基本信息</p>
          <el-form label-width="100px">
            <el-form-item label="名称：">
              test
            </el-form-item>
            <el-form-item label="ID：">
              79383932002-1818282-9191
            </el-form-item>
            <el-form-item label="类型：">
              通用型
            </el-form-item>
            <el-form-item label="内存：">
              通用型
            </el-form-item>
            <el-form-item label="CPU：">
              通用型
            </el-form-item>
            <el-form-item label="SSH秘钥：">
              通用型
            </el-form-item>
            <el-form-item label="系统：">
              通用型
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :offset="1" :span="16">
        <el-tabs v-model="activeName">
          <el-tab-pane label="监控" name="first">
            <MonitorCharts />
          </el-tab-pane>
          <el-tab-pane label="告警" name="second">告警</el-tab-pane>
          <el-tab-pane label="拓扑" name="third">拓扑</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as Config from './config'
import MonitorCharts from './info-components/monitor-charts.vue'

export default {
  components: {
    MonitorCharts
  },
  data() {
    return {
      query: {
        value: ''
      },
      activeName: 'first',
      moreOperate: Config.moreOperate
    }
  }
}
</script>

<style lang="scss" scoped>
.cloud-host-info-conotainer{
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-form-item{
    margin-bottom: 0;
  }
  .batch-handle-row{
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  .cloud-host-info{
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    color: #333;
    .left-card{
      background: #DAEDC9;
      padding: 10px 20px;
      .title{
        font-size: 16px;
      }
    }
  }
}
</style>
