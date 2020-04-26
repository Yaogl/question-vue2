<template lang="html">
  <div class="mirror-image-list-container">
    <el-tabs v-model="activeTab">
       <el-tab-pane label="公共镜像" name="1">
         <pub-list />
       </el-tab-pane>
       <el-tab-pane label="私有镜像" name="2">
         <private-list />
       </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
import PubList from './components/pub-list.vue'
import PrivateList from './components/private-list.vue'

export default {
  components: {
    PubList,
    PrivateList
  },
  data() {
    return {
      activeTab: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.mirror-image-list-container{
  padding: 15px;
}
</style>
