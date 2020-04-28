<template lang="html">
  <!-- 顶部面包屑导航以及搜索框 -->
  <div class="layout-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="{ path: item.index.includes('/') ? item.index : '/' }"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'breadcrumbList'
    ])
  }
}
</script>

<style lang="scss" scoped>
.layout-breadcrumb{
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
