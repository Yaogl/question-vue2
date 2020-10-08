<template>
<div class="login-wrap">
  <div class="ms-login">
    <div class="ms-title">题库</div>

    <el-carousel :autoplay="false" indicator-position="none" ref="carousel">
      <el-carousel-item>
        <el-form :model="loginFormData" :rules="loginRules" ref="login" label-width="0px" size="normal" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model.trim="loginFormData.username" placeholder="请输入用户名">
              <i slot="prefix" class="iconfont">&#xe651;</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              show-password
              v-model.trim="loginFormData.password"
              @keyup.enter.native="submitForm()">
              <i slot="prefix" class="iconfont">&#xe645;</i>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" :loading="loading" @click="submitForm()">登录</el-button>
          </div>
          <p class="login-tips">
            <el-button type="text" @click="transfer">去注册</el-button>
          </p>
        </el-form>
      </el-carousel-item>
      <el-carousel-item>
        <el-form :model="registerFormData" :rules="registerRules" ref="register" label-width="0px" size="normal" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model.trim="registerFormData.username" placeholder="请输入用户名">
              <i slot="prefix" class="iconfont">&#xe651;</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="upwd" placeholder="请输入密码" show-password v-model.trim="registerFormData.password">
              <i slot="prefix" class="iconfont">&#xe645;</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="realname">
            <el-input placeholder="请输入真实姓名" v-model.trim="registerFormData.realname">
              <i slot="prefix" class="iconfont">&#xe645;</i>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="registerSubmit" :loading="loading">注册</el-button>
          </div>
          <p class="login-tips">
            <el-button type="text" @click="transfer">去登录</el-button>
          </p>
        </el-form>
      </el-carousel-item>
    </el-carousel>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { authLogin, registerUser } from '@/api/login'
import * as Config from './config'
// import MD5 from 'js-md5'

export default {
  data() {
    return {
      loginFormData: {
        username: '',
        password: ''
      },
      registerRules: Config.getRegisterRules(this),
      loginRules: Config.getLoginRules(this),
      registerFormData: {
        username: '',
        password: '',
        realname: ''
      },
      loading: false
    }
  },
  created() {
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    registerSubmit() {
      this.$refs.register.validate(valid => {
        if (valid) {
          this.loading = true
          registerUser(this.registerFormData).then(res => {
            this.loading = false
            if (res.code === 0) {
              this.$message.success('注册成功')
              this.transfer()
            }
          })
        }
      })
    },
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.loading = true
          let clone = JSON.parse(JSON.stringify(this.loginFormData))
          authLogin(clone).then(res => {
            this.loading = false
            if (res.code === 0) {
              this.$message.success('登录成功')
              delete clone.password
              clone.realname = res.data.realname
              this.setUserInfo(clone)
              this.$router.push('/dashboard')
            }
          })
        }
      })
    },
    transfer() {
      this.$refs.carousel.next()
      this.$refs.register.resetFields()
      this.$refs.login.resetFields()
    },
  }
}
</script>

<style lang="scss" scoped>
.login-wrap /deep/{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000;
    border-bottom: 1px solid #ddd;
    background: rgba(255, 255, 255, 0.9);
  }

  .ms-login {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
    background: rgba(255, 255, 255, 0.9);
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
  .el-input__prefix{
    margin-left: 4px;
    line-height: normal;
    top: 11px;
  }
  .el-input-group__append, .el-input-group__prepend{
    padding: 0;
    border: none;
    background-color: transparent;
  }
  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
  .el-carousel__container{
    .el-carousel__arrow--left, .el-carousel__arrow--right{
      display: none;
    }
  }
}
</style>
