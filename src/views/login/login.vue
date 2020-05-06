<template>
<div class="login-wrap">
  <div class="ms-login">
    <div class="ms-title">长城云平台</div>

    <el-carousel :autoplay="false" indicator-position="none" ref="carousel">
      <el-carousel-item>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" size="normal" class="ms-content">
          <el-form-item prop="uname">
            <el-input v-model.trim="param.uname" placeholder="username">
              <el-button slot="prepend">
                <i class="iconfont">&#xe651;</i>
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="upwd">
            <el-input type="upwd" placeholder="password" show-password v-model.trim="param.upwd" @keyup.enter.native="submitForm()">
              <el-button slot="prepend">
                <i class="iconfont">&#xe645;</i>
              </el-button>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </div>
          <p class="login-tips">
            <el-button type="text" @click="transfer">去注册</el-button>
          </p>
        </el-form>
      </el-carousel-item>
      <el-carousel-item>
        <el-form :model="formData" :rules="rules" ref="register" label-width="0px" size="normal" class="ms-content">
          <el-form-item prop="uname">
            <el-input v-model.trim="formData.uname" placeholder="username">
              <el-button slot="prepend">
                <i class="iconfont">&#xe651;</i>
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="upwd">
            <el-input type="upwd" placeholder="password" show-password v-model.trim="formData.upwd" @keyup.enter.native="submitForm()">
              <el-button slot="prepend">
                <i class="iconfont">&#xe645;</i>
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="tupwd">
            <el-input type="upwd" placeholder="password" show-password v-model.trim="formData.tupwd" @keyup.enter.native="submitForm()">
              <el-button slot="prepend">
                <i class="iconfont">&#xe645;</i>
              </el-button>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary">注册</el-button>
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
import { login } from '@/api/login'
export default {
  data() {
    return {
      isRegister: false, // 是否显示注册
      param: {
        uname: 'admin',
        upwd: '123123'
      },
      formData: {
        uname: 'admin',
        upwd: '123123',
        tupwd: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: this.validUserName(), trigger: 'blur' }
        ],
        upwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: this.validPassword(), trigger: 'blur' }
        ],
        tupwd: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.validPasswordAgain(), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    transfer() {
      this.$refs.carousel.next()
      this.$refs.register.resetFields()
      this.$refs.login.resetFields()
    },
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          // let formData = new FormData()
          // formData.append('uname', this.param.uname)
          // formData.append('upwd', this.param.upwd)
          // formData.append('type', 'c')
          // login(formData).then(res => {
          //   if (res.success === 'true') {
          //     this.$cookies.set('username', this.param.uname)
          //     this.$cookies.set('password', this.param.upwd)
          //   }
          //
          // })
          this.setUserInfo(this.param)
          this.$router.push('/')
        }
      })
    },
    validUserName() {
      return (rule, value, callback) => {
        let reg = /^[a-zA-Z]{1,30}$/
        if (!reg.test(value)) {
          return callback(new Error('只能输入1-30个以字母开头的字串'))
        } else {
          return callback()
        }
      }
    },
    validPassword() {
      return (rule, value, callback) => {
        let reg = /^(\w){6,20}$/
        if (!reg.test(value)) {
          return callback(new Error('只能输入6-20个字母、数字、下划线'))
        } else {
          return callback()
        }
      }
    },
    validPasswordAgain() {
      return (rule, value, callback) => {
        let reg = /^(\w){6,20}$/
        if (!reg.test(value)) {
          return callback(new Error('只能输入6-20个字母、数字、下划线'))
        } else {
          if (value !== this.formData.upwd) {
            return callback(new Error('密码输入不一致'))
          } else {
            return callback()
          }
        }
      }
    }
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
    color: #666;
    border-bottom: 1px solid #ddd;
    background: rgba(255, 255, 255, 0.3);
  }

  .ms-login {
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
    background: rgba(255, 255, 255, 0.3);
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
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
