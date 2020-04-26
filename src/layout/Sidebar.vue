<template>
<div class="sidebar">
  <div class="title-row">
    <i @click="collapseChage" :class="sideBarCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    <span v-if="!sideBarCollapse" class="title">长城云平台</span>
  </div>
  <el-menu class="sidebar-el-menu" @select="menuSelect" :default-active="onRoutes" :collapse="sideBarCollapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened>
    <template v-for="item in items">
      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
              <template slot="title">{{ subItem.title }}</template>
              <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                <span style="margin-left: 40px;">{{ threeItem.title }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
              <span style="margin-left: 20px;">{{ subItem.title }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import menuList from './menuList'

export default {
  data() {
    return {
      items: menuList
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path
    },
    ...mapGetters([
      'sideBarCollapse'
    ])
  },
  methods: {
    ...mapActions([
      'setSideBarCollapse'
    ]),
    menuSelect(path) {
      // console.log(path);
      if (this.onRoutes === path) return
      this.$router.push(path)
    },
    collapseChage() {
      this.setSideBarCollapse(!this.sideBarCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  .title-row {
    height: 56px;
    background: rgb(50, 65, 87);
    color: #fff;
    padding: 0 20px;
    line-height: 56px;
    .title {
      margin-left: 7px;
    }
  }
}

.sidebar > ul::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  overflow-y: auto;
  height: calc(100% - 56px);
}
</style>
