<template lang="html">
  <div class="resource-overview-container">
    <el-row :gutter="30">
        <el-col :span="18">
          <el-row :gutter="40" class="flex mgb20">
            <el-col :span="12" style="flex: 1;">
              <el-card class="box-card" shadow="never" style="height: 100%;">
                <p class="item">项目信息</p>
                <p class="text">名称：测试项目</p>
                <p class="text">描述：--</p>
                <p class="text">成员数：10</p>
                <p class="text">管理员：test</p>
                <p class="text">创建时间：2020-02-10</p>
              </el-card>
            </el-col>
            <el-col :span="12" style="flex: 1;">
              <el-card class="box-card" shadow="never">
                <el-row class="source">
                  <el-col :span="6" align="center" v-for="(item, index) in sourceList" :key="index">
                    <p class="item">{{ item.name }}</p>
                    <p class="item">{{ item.value }}</p>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row class="source">
                  <el-col :span="6" align="center" v-for="(item, index) in sourceList2" :key="index">
                    <p class="item">{{ item.name }}</p>
                    <p class="item">{{ item.value }}</p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>

          <div class="mgb20">
            <el-card class="box-card" shadow="never" style="height: 100%;">
              <p class="item">费用</p>
              <el-row>
                <el-col :span="12" style="border-right: 1px solid #ccc;">
                  <el-row>
                    <el-col :span="12" align="center">
                      <p>项目每日预估消费</p>
                      <p class="money">
                        <span class="unit">￥</span>
                        <span class="num">204.3</span>
                      </p>
                    </el-col>
                    <el-col :span="12">
                      <PieChart />
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <p class="circle-line">
                    <span class="circle-before green1">云主机</span>
                    <span class="weight">￥100.3</span>
                  </p>
                  <p class="circle-line">
                    <span class="circle-before green2">镜像</span>
                    <span class="weight">￥50.0</span>
                  </p>
                  <p class="circle-line">
                    <span class="circle-before green3">存储</span>
                    <span class="weight">￥54.0</span>
                  </p>
                </el-col>
              </el-row>
            </el-card>
          </div>

          <div class="mgb20">
            <el-card class="box-card" shadow="never" style="height: 100%;">
              <SourceCharts />
            </el-card>
          </div>

        </el-col>
        <el-col :span="6">
          <el-card class="box-card mgb20" shadow="never">
            <p class="notice-title">公告</p>
            <p class="text" style="margin-bottom: 100px;">欢迎使用长城云服务平台，为您提供优质服务。</p>
            <p>项目管理员：2020-210</p>
          </el-card>
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <span class="title">帮助</span>
              <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
            </div>
            <div v-for="(item, index) in helpList" :key="index" class="text item">
              {{ item.text }}
            </div>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import SourceCharts from './components/source-charts.vue'
import PieChart from './components/pie-chart.vue'

export default {
  components: {
    SourceCharts,
    PieChart
  },
  data() {
    return {
      helpList: [
        { text: '创建你的第一个云主机' },
        { text: '常见问题' },
        { text: '平台产品手册' },
        { text: '对象存储' },
        { text: '网络服务' },
        { text: '容器服务' }
      ],
      sourceList: [
        { name: '云主机', value: '20台' },
        { name: '存储', value: '200T' },
        { name: '内存', value: '200G' },
        { name: 'VPC', value: '10个' }
      ],
      sourceList2: [
        { name: 'CPU', value: '100核' },
        { name: '镜像', value: '10个' },
        { name: 'GPU', value: '2个' },
        { name: '弹性IP', value: '2个' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.resource-overview-container{
  .box-card{
    background: #DFF8D3;
  }
  .notice-title{
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 40px;
  }
  .text{
    line-height: 28px;
  }
  .item{
    cursor: pointer;
    line-height: 38px;
  }
  .title{
    font-size: 18px;
    font-weight: 600;
  }
  .source{
    .el-col{
      border-right: 1px solid #ccc;
    }
    .el-col:last-child{
      border: none;
    }
  }
  .money{
    margin-top: 30px;
    .unit{
      font-size: 12px;
    }
    .num{
      font-size: 40px;
      font-weight: 600;
    }
  }
  .circle-line{
    line-height: 34px;
    margin-left: 30%;
    .weight{
      font-weight: 600;
    }
  }
  .circle-before {
    margin-right: 20px;
    &:before {
      display: inline-block;
      content: "";
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }
    &.green1 {
      &:before {
        background: #00D7B3;
      }
    }
    &.green2 {
      &:before {
        background: #09B3F0;
      }
    }
    &.green3 {
      &:before {
        background: #FF647E;
      }
    }
  }
}
</style>
