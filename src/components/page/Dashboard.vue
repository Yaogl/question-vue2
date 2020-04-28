<template>
<div>
  <el-button type="warning" @click="getTestInfo">test</el-button>
  {{ info }}
</div>
</template>

<script>
import { getTest } from '@/api/cloud-host'
export default {
  name: 'dashboard',
  data() {
    return {
      info: ''
    }
  },
  methods: {
    getTestInfo() {
      getTest().then(res => {
        this.info = res
      })
    }
  }
}
</script>


<style scoped>
</style>
