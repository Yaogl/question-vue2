<template lang="html">
  <div class="pie-charts-components">
    <ve-pie :data="chartData" height="120px" width="120px" :extend="extend" :settings="chartSettings"></ve-pie>
  </div>
</template>

<script>
export default {
  // 图表示例
  data() {
    this.chartSettings = {
      label: {
        position: 'inside'
      },
      hoverAnimation: false,
      labelLine: {
        show: false
      },
      radius: 50,
      offsetY: 50
    }
    this.extend = {
      legend: {
        show: false,
        zlevel: -10
      }
    }
    return {
      curTimer: 1,
      chartData: {
        columns: ['项目', '消费'],
        rows: [
          { '项目': '云主机', '消费': 100.3 },
          { '项目': '镜像', '消费': 50 },
          { '项目': '存储', '消费': 54 },
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.pie-charts-components{
  .time-row{
    padding: 20px 0;
  }
}
</style>
