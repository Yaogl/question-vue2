<template>
<div class="layout-wrapper">
  <v-sidebar></v-sidebar>
  <div class="content-box" :class="{'content-collapse': sideBarCollapse}">
    <v-head></v-head>
    <!-- <v-tags></v-tags> -->
    <!-- <v-breadcrumb /> -->
    <div class="content">
      <transition name="move" mode="out-in">
        <keep-alive :include="keepLiveList">
          <router-view></router-view>
        </keep-alive>
      </transition>
      <el-backtop target=".content"></el-backtop>
    </div>
  </div>
</div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import vTags from './Tags.vue'
import vBreadcrumb from './breadcrumb.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    vHead,
    vSidebar,
    vTags,
    vBreadcrumb
  },
  computed: {
    ...mapGetters([
      'sideBarCollapse',
      'tagsList'
    ]),
    keepLiveList() {
      let arr = []
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        this.tagsList[i].name && arr.push(this.tagsList[i].name)
      }
      return arr
    }
  }
}
</script>
