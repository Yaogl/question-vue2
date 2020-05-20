<template>
<div id="app">
  <router-view></router-view>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getUserAuth } from '@/api/system-manage'

export default {
  watch: {
    $route(val) {
      this.setBreadcrumbList(val)
    }
  },
  created() {
    this.setLoginTime()
    this.getProjectList()
  },
  computed: {
    ...mapGetters([
      'projectList'
    ])
  },
  methods: {
    ...mapActions([
      'setBreadcrumbList',
      'setLoginTime',
      'getProjectList'
    ])
  }
}
</script>
<style>
/*深色主题*/
@import "./assets/css/theme-green/color-green.css";
</style>
