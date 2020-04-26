<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="reset-password-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">重置密码</span>
      <span class="tip">重置密码虚拟机需要关机状态</span>
    </div>
    <div class="body">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="管理员密码：">
        </el-form-item>

        <el-form-item label-width="40px">
          <el-input placeholder="请输入密码" class="input-width-2" v-model="formData.password"></el-input>
        </el-form-item>

        <el-form-item label-width="40px">
          <el-input placeholder="请再次确认" class="input-width-2" v-model="formData.macksure"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'reset-password',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
      }
    }
  },
  data() {
    return {
      formData: {
        password: '',
        macksure: ''
      }

    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$message.success(`密码：${this.formData.password}`)
    }
  }
}
</script>

<style lang="scss">
.reset-password-cloud{
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .tip{
    color: red;
  }
  .body{
    padding: 20px 50px;
  }
}
</style>
