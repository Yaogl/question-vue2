<template lang="html">
  <div class="monitor-charts-components">
    <!-- <div class="time-row">
      <el-radio-group v-model="curTimer">
        <el-radio-button label="半小时"></el-radio-button>
        <el-radio-button label="一天"></el-radio-button>
        <el-radio-button label="一周"></el-radio-button>
        <el-radio-button label="一个月"></el-radio-button>
        <el-radio-button label="半年"></el-radio-button>
      </el-radio-group>
    </div> -->
    <div class="charts-container">
      <ve-line ref="charts" :data="chartData" :title="{text: 'CPU使用率'}" :settings="chartSettings" :extend="extend"></ve-line>
    </div>
    <div class="charts-container">
      <ve-line ref="charts" :data="storageData" :title="{text: '内存使用率'}" :settings="chartSettings" :extend="extend"></ve-line>
    </div>
    <div class="charts-container">
      <ve-line ref="charts" :data="readWriteData" :title="{text: '磁盘读写宽带（vda）'}" :settings="readSeting" :extend="extendRead"></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  // 图表示例
  data() {
    this.chartSettings = {
      dimension: ['时间'],
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
    this.extendRead = {
      color: ['#F23D0C'],
      series: {
        smooth: false
      },
      legend: {
        show: false
      }
    }
    this.readSeting = {
      dimension: ['时间'],
      yAxisName: ['bps']
    }
    return {
      curTimer: 1,
      chartData: {
        columns: ['时间', 'CPU使用率'],
        rows: []
      },
      // 内存使用率
      storageData: {
        columns: ['时间', '内存使用率'],
        rows: []
      },
      // 磁盘读写宽带
      readWriteData: {
        columns: ['时间', '磁盘读'],
        rows: []
      }
    }
  },
  mounted() {
    const arr = this.getDateArray()
    this.initChartData(arr)
    this.initStorageChartData(arr)
    this.initReadChartData(arr)
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
      this.timeout = setTimeout(() => {
        this.initChartData(arr)
      }, 10000)
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
      this.timeout1 = setTimeout(() => {
        this.initStorageChartData(arr)
      }, 10000)
    },
    initReadChartData(arr) {
      if (this.readWriteData.rows.length) {
        arr.map((item, index) => {
          let num = Number(this.readWriteData.rows[index]['磁盘读'])
          this.readWriteData.rows[index]['磁盘读'] = Math.random() > 0.5 ? (num > 0.98 ? num : num + 0.02) : (num > 0.02 ? num - 0.02 : num)
        })
      } else {
        arr.map((item, index) => {
          this.readWriteData.rows.push({ '时间': item, '磁盘读': Math.random().toFixed(2) })
        })
      }
      this.timeout2 = setTimeout(() => {
        this.initReadChartData(arr)
      }, 10000)
    }
  },
  beforeDestroy () {
    this.timeout && clearTimeout(this.timeout)
    this.timeout1 && clearTimeout(this.timeout1)
    this.timeout2 && clearTimeout(this.timeout2)
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
