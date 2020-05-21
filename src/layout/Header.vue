<template>
<div class="header">
  <div class="header-left">
    <i :class="sideBarCollapse ? 'el-icon-s-unfold pointer' : 'el-icon-s-fold pointer'" @click="collapseChage"></i>
    <div class="project-choose">
      <span class="label">项目：</span>
      <el-select :value="curProjectInfo" value-key="uuid" placeholder="请选择项目" @change="updateProject">
        <el-option v-for="(item, index) in projectList" :key="item.uuid" :label="item.name" :value="item"></el-option>
      </el-select>
    </div>
  </div>
  <div class="header-right">
    <div class="header-user-con">
      <!-- 全屏显示 -->
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="isFullScreen ? `取消全屏` : `全屏`" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <!-- 用户头像 -->
      <!-- <div class="user-avator">
        <img src="../assets/img/img.jpg" />
      </div> -->
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.name }}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      name: 'linxin',
      message: 2
    };
  },
  computed: {
    ...mapGetters([
      'sideBarCollapse',
      'isFullScreen',
      'userInfo',
      'projectList',
      'curProjectInfo'
    ])
  },
  methods: {
    ...mapActions([
      'setSideBarCollapse',
      'setFullScreen',
      'loginOut',
      'setCurProject'
    ]),
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        this.loginOut()
        this.$router.push('/login')
        location.reload()
      }
    },
    collapseChage() {
      this.setSideBarCollapse(!this.sideBarCollapse)
    },
    updateProject(project) {
      this.setCurProject(project)
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.setFullScreen(!this.isFullScreen)
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  background: #fff;
  border-bottom: 1px solid #ccc;
  .header-left{
    float: left;
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 60px;
    .project-choose{
      .label{
        font-size: 14px;
        line-height: 22px;
        margin-left: 20px;
      }
    }
  }
  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 60px;
    align-items: center;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell,
  .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
}
</style>
