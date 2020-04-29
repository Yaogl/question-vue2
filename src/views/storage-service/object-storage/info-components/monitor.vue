<template lang="html">
  <el-row>
    <el-col :span="8">
      <ve-line ref="charts1" :data="chartData" :title="{text: '当前存储总量'}" :settings="chartSettings" :extend="extend"></ve-line>
    </el-col>
    <el-col :span="8">
      <ve-line ref="charts2" :data="chartData" :title="{text: '当前存储总量'}" :settings="chartSettings" :extend="extend"></ve-line>
    </el-col>
    <el-col :span="8">
      <ve-line ref="charts3" :data="chartData" :title="{text: '当前存储总量'}" :settings="chartSettings" :extend="extend"></ve-line>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      dimension: ['日期'],
      yAxisName: ['%'],
      area: true
    }
    this.extend = {
      series: {
        smooth: false
      },
      yAxis: {
        axisLabel: {
          formatter: '{value} kb' // 挺强大的
        }
      },
      legend: {
        show: false
      }
    }
    return {
      chartData: {
        columns: ['日期', 'CPU使用率'],
        rows: [
          { '日期': '1/1', 'CPU使用率': 100  },
          { '日期': '1/2', 'CPU使用率': 34  },
          { '日期': '1/3', 'CPU使用率': 25 },
          { '日期': '1/4', 'CPU使用率': 18 },
          { '日期': '1/5', 'CPU使用率': 87 },
          { '日期': '1/6', 'CPU使用率': 90 }
        ]
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs[`chart1`].echarts.resize()
    //   this.$refs[`chart2`].echarts.resize()
    //   this.$refs[`chart3`].echarts.resize()
    // })
  }
}
</script>

<style lang="scss" scoped>
</style>
