<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="generate-image-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">生成镜像</span>
      <span class="tip">生成镜像虚拟机需要关机状态</span>
    </div>
    <div class="body">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="管理员密码：">
        </el-form-item>

        <el-form-item label="镜像名称：">
          <el-input placeholder="请输入镜像名称" class="input-width-2" v-model="formData.password"></el-input>
        </el-form-item>

        <el-form-item label="镜像大小：">
          10GB
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
  name: 'generate-image',
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
      this.$message.success(`镜像名称：${this.formData.password}`)
    }
  }
}
</script>

<style lang="scss">
.generate-image-cloud{
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
