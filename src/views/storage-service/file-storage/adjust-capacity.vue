<template lang="html">
  <div class="object-storage-info-container">
    <el-card class="mgb20" shadow="never">
      <p class="title">调整容量</p>
      <el-form label-width="120px">
        <el-form-item label="计费方式：">
          包年包月（￥10.00 / 月）
        </el-form-item>
        <el-form-item label="所属项目：">
          开发项目
        </el-form-item>
        <el-form-item label="云提供商：">
          openStack
        </el-form-item>
        <el-form-item label="区域：">
          保定
        </el-form-item>
        <el-form-item label="可用区：">
          nova
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mgb20" shadow="never">
      <p class="title">修改信息</p>
      <el-form label-width="120px">
        <el-form-item label="名称：">
          test
        </el-form-item>
        <el-form-item label="当前容量：">
          10GB
        </el-form-item>
        <el-form-item label="扩容后：">
          <el-input-number v-model="value" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    }
  },
  methods: {
    handleChange(a) {
      console.log(a);
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
