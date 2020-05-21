<template lang="html">
  <div class="quota-info-container">
    <el-card class="box-card" shadow="never">
      <div slot="header">
        <span class="title">项目配额使用情况</span>
      </div>
      <el-form label-width="150px" v-loading="quotaLoading">
        <el-row v-if="quotaList.length">
          <el-col :span="12" v-for="item in quotaList" :key="item.id">
            <el-form-item :label="item.resoureName + '：'">
              <el-tooltip :content="`${item.used} / ${item.limit}`" placement="top">
                <el-progress class="input-width-percent-7" color="#00CF77" :stroke-width="24" :percentage="Number(item.used) / Number(item.limit) * 100" :show-text="false" status="success"></el-progress>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else class="no-quota">
          暂无配额信息
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'quotaList',
      'quotaLoading'
    ])
  }
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
  .no-quota{
    line-height: 300px;
    font-size: 16px;
    color: #999;
    text-align: center;
  }
}
</style>
