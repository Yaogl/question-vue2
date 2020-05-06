<template lang="html">
  <div class="source-charts-components">
    <el-row>
      <el-col :span="12" style="border-right: 1px solid #ccc;">
        <ve-line ref="charts" :data="chartData" height="150px" :settings="chartSettings" :extend="extend"></ve-line>
      </el-col>
      <el-col :span="12">
        <ve-line ref="charts" :data="storageData" height="150px" :settings="chartSettings" :extend="extend"></ve-line>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // 图表示例
  data() {
    this.chartSettings = {
    }
    this.extend = {
      series: {
        smooth: false,
        showSymbol: false
      },
      grid: {
        top: '10%',
        left: '30%',
        right: '10%',
        bottom: '10%'
      },
      yAxis: {
        show: false
      },
      legend: {
        show: true,
        icon: 'circle',
        orient: 'vertical',
        left: '3%',
        top: 'center'
      }
    }
    return {
      curTimer: 1,
      chartData: {
        columns: ['日期', '磁盘总量'],
        rows: [
          { '日期': '04-26', '磁盘总量': 1 },
          { '日期': '04-29', '磁盘总量': 3 },
          { '日期': '05-02', '磁盘总量': 5 },
          { '日期': '05-05', '磁盘总量': 3 },
          { '日期': '05-08', '磁盘总量': 5 }
        ]
      },
      // 内存使用率
      storageData: {
        columns: ['日期', '内存总量', 'CPU核数'],
        rows: [
          { '日期': '04-26', '内存总量': 1, 'CPU核数': 1 },
          { '日期': '04-29', '内存总量': 3, 'CPU核数': 5 },
          { '日期': '05-02', '内存总量': 5, 'CPU核数': 3 },
          { '日期': '05-05', '内存总量': 3, 'CPU核数': 7 },
          { '日期': '05-08', '内存总量': 5, 'CPU核数': 2 }
        ]
      }
    }
  },
  mounted() {
    // const arr = this.getDateArray()
    // this.initChartData(arr)
    // this.initStorageChartData(arr)
  },
  methods: {
    // 获取半小时内数据
    getDateArray(endDate = new Date(), splitTime = 3 * 60 * 1000, count = 10) {
      let endTime = endDate.getTime()
      let mod = endTime % splitTime
      if(mod > 0) {
        endTime -= mod;
      }
      let dateArray = []
      while(count-- > 0) {
        let d = new Date()
        d.setTime(endTime - count * splitTime)
        dateArray.push(d.getHours() + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()))
      }
      return dateArray
    },
    initChartData(arr) {
      if (this.chartData.rows.length) {
        arr.map((item, index) => {
          let num = Number(this.chartData.rows[index]['CPU使用率'])
          this.chartData.rows[index]['CPU使用率'] = Math.random() > 0.5 ? (num > 0.98 ? num : num + 0.02) : (num > 0.02 ? num - 0.02 : num)
        })
      } else {
        arr.map((item, index) => {
          this.chartData.rows.push({ '时间': item, 'CPU使用率': Math.random().toFixed(2) })
        })
      }
    },
    // 初始化内存使用率
    initStorageChartData(arr) {
      if (this.storageData.rows.length) {
        arr.map((item, index) => {
          let num = Number(this.storageData.rows[index]['内存使用率'])
          this.storageData.rows[index]['内存使用率'] = Math.random() > 0.5 ? (num > 0.98 ? num : num + 0.02) : (num > 0.02 ? num - 0.02 : num)
        })
      } else {
        arr.map((item, index) => {
          this.storageData.rows.push({ '时间': item, '内存使用率': Math.random().toFixed(2) })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.source-charts-components{
  .time-row{
    padding: 20px 0;
  }
}
</style>
