<template lang="html">
  <div class="block-info-container" v-loading="loading">
    <el-card class="mgb20" shadow="never">
      <p class="title">基本信息</p>
      <el-row>
        <el-col :span="5">
          <p class="item">名称：{{ blockInfo.name }}</p>
          <p class="item">项目：开发项目</p>
          <p class="item">地区：{{ blockInfo.availability_zone }}</p>
        </el-col>
        <el-col :span="8">
          <p class="item">ID：{{ blockInfo.id }}</p>
          <p class="item">创建时间：{{ blockInfo.created_at }}</p>
        </el-col>
        <el-col :span="5">
          <p class="item">类型：{{ blockInfo.volume_type }}</p>
          <p class="item">容量：{{ blockInfo.size + 'GB' }}</p>
        </el-col>
        <el-col :span="5">
          <p class="item">状态：{{ blockInfo.status === 'in-use' ? '已挂载' : '未挂载' }}</p>
          <p class="item">删除保护：
            <el-switch v-model="value" active-color="#13ce66"></el-switch>
          </p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getBlockInfo } from '@/api/storage-service'

export default {
  created() {
    this.loading = true
    getBlockInfo(this.$route.query.volume_id).then(res => {
      this.blockInfo = res.result
      this.loading = false
    })
  },
  data() {
    return {
      value: true,
      loading: false,
      blockInfo: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.block-info-container{
  padding: 20px 10px;
  .item{
    color: #666;
    line-height: 20px;
    padding: 15px 0;
  }
  .title{
    line-height: 40px;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
