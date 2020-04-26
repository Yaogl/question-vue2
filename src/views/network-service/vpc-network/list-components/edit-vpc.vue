<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="edit-vpc-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">修改VPC</span>
    </div>
    <div class="body">
      <el-form label-width="100px">
        <el-form-item label="VPC名称：">
          <el-input placeholder="请输入名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="项目：">
          <el-input placeholder="请输入项目名称" v-model="formData.projectName"></el-input>
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
  name: 'edit-vpc',
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
        projectName: '',
        name: ''
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
.edit-vpc-cloud{
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
