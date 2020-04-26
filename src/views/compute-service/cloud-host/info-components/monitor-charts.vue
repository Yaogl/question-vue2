<template lang="html">
  <div class="monitor-charts-components">
    <div class="time-row">
      <el-radio-group v-model="curTimer">
        <el-radio-button label="半小时"></el-radio-button>
        <el-radio-button label="一天"></el-radio-button>
        <el-radio-button label="一周"></el-radio-button>
        <el-radio-button label="一个月"></el-radio-button>
        <el-radio-button label="半年"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="charts-container">
      <ve-line :data="chartData" :title="{text: 'CPU使用率'}" :settings="chartSettings" :extend="extend"></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  // 图表示例
  data() {
    this.chartSettings = {
      dimension: ['日期'],
      yAxisName: ['%']
    }
    this.extend = {
      series: {
        smooth: false
      },
      legend: {
        show: false
      }
    }
    return {
      curTimer: 1,
      chartData: {
        columns: ['日期', 'CPU使用率'],
        rows: [
          { '日期': '1/1', 'CPU使用率': 0.1  },
          { '日期': '1/2', 'CPU使用率': 0.3  },
          { '日期': '1/3', 'CPU使用率': 0.8 },
          { '日期': '1/4', 'CPU使用率': 0.2 },
          { '日期': '1/5', 'CPU使用率': 0.7 },
          { '日期': '1/6', 'CPU使用率': 0 }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor-charts-components{
  .time-row{
    padding: 20px 0;
  }
}
</style>
