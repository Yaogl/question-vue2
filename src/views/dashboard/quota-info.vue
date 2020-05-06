<template lang="html">
  <div class="quota-info-container">
    <el-card class="box-card" shadow="never">
      <div slot="header">
        <span class="title">项目配额使用情况</span>
        <el-button style="float: right; padding: 3px 0" type="text">更新配额信息</el-button>
      </div>
      <el-form label-width="100px" label-position="left">
        <el-row>
          <el-col :span="8">
            <p class="sub-title">计算</p>
            <el-form-item label="云主机个数">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="50" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="CPU个数">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="30" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="内存总容量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="30" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="镜像个数">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="15" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="SSH秘钥">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="30" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="快照个数">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="0" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="安全组数量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="0" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <p class="sub-title">容器服务</p>
            <el-form-item label="容器集群">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="40" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <p class="sub-title">安全</p>
            <el-form-item label="防火墙">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="30" :show-text="false" status="success"></el-progress>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="8">
            <p class="sub-title">存储</p>
            <el-form-item label="硬盘数量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="50" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="硬盘容量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="20" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="bucket数量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="40" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="对象数量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="30" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="对象存储容量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="20" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <p class="sub-title">网络</p>
            <el-form-item label="vpc个数">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="10" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="子网数量">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="30" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="负载均衡">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="30" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="NAT网关">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="40" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <el-form-item label="公网IP">
              <el-progress color="#00CF77" :stroke-width="24" :percentage="70" :show-text="false" status="success"></el-progress>
            </el-form-item>
            <p class="sub-title">容器服务</p>
          </el-col>
        </el-row>
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.quota-info-container{
  .el-card /deep/{
    border: none;
    .title{
      font-size: 18px;
      font-weight: 600;
    }
    .sub-title{
      font-size: 18px;
      font-weight: 600;
      line-height: 50px;
    }
    .el-progress{
      top: 4px;
    }
    .el-progress-bar__outer, .el-progress-bar__inner{
      border-radius: 0!important;
    }
  }
}
</style>
