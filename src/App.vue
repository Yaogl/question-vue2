<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import menuList from './layout/menuList'

export default{
  watch: {
    $route(val) {
      console.log(process.env);
    }
  }
}
</script>
<style>
/*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
