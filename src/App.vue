<template>
<div id="app">

  <router-view></router-view>
</div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  watch: {
    $route(val) {
      this.setBreadcrumbList(val)
    }
  },
  created() {
    this.setLoginTime()
  },
  methods: {
    ...mapActions([
      'setBreadcrumbList',
      'setLoginTime'
    ])
  }
}
</script>
<style>
/*深色主题*/
@import "./assets/css/theme-green/color-green.css";
</style>
