<template lang="html">
  <div class="object-storage-info-container">
    <el-card class="mgb20" shadow="never">
      <p class="title">基本信息</p>
      <el-row>
        <el-col :span="24">
          <span class="item">名称：test</span>
          <span class="item">云主机数量：10</span>
          <span class="item">项目：test</span>
          <span class="item">名称：test</span>
          <span class="item">云主机数量：10</span>
          <span class="item">项目：test</span>
          <span class="item">名称：test</span>
          <span class="item">云主机数量：10</span>
          <span class="item">项目：test</span>
          <span class="item">名称：test</span>
          <span class="item">云主机数量：10</span>
          <span class="item">项目：test</span>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="activeName">
      <el-tab-pane label="文件管理" name="first">
        <FileManage />
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="second">
        <OperationLog />
      </el-tab-pane>
      <el-tab-pane label="监控" name="third">
        <monitor v-if="activeName === 'third'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FileManage from './info-components/file-manage.vue'
import OperationLog from './info-components/operation-log.vue'
import Monitor from './info-components/monitor.vue'

export default {
  components: {
    FileManage,
    OperationLog,
    Monitor
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
.object-storage-info-container{
  padding: 20px 10px;
  .title{
    font-weight: 600;
    padding-bottom: 10px;
  }
  .item{
    color: #666;
    line-height: 20px;
    display: inline-block;
    margin-right: 40px;
    padding: 8px 0;
  }
}
</style>
