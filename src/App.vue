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
    console.log(process.env);
  },
  methods: {
    ...mapActions([
      'setBreadcrumbList'
    ])
  }
}
</script>
<style>
/*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
