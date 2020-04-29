<template>
  <div class="dashboard">
    <el-row class="mgb20">
      <el-button type="warning" @click="getTestInfo">test</el-button>
      {{ info }}
    </el-row>
    <el-row>
      <el-button type="warning" @click="getTestInfo4">test4</el-button>
      {{ info4 }}
    </el-row>
  </div>
</template>

<script>
import { getTest, getTest4 } from '@/api/cloud-host'
export default {
  name: 'dashboard',
  data() {
    return {
      info: '',
      info4: ''
    }
  },
  methods: {
    getTestInfo() {
      getTest().then(res => {
        this.info = res
      })
    },
    getTestInfo4() {
      getTest4().then(res => {
        this.info4 = res
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.dashboard{
  padding: 40px;
}
</style>
