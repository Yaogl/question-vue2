<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="create-bucket-storage"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">创建存储桶</span>
    </div>
    <div class="body">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="所属项目：">
          开发项目
        </el-form-item>

        <el-form-item label="云提供商：">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择云提供商">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地域和可用区：">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择地域">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="名称：">
          <el-input placeholder="请输入bucket名称" class="input-width-2" v-model="formData.password"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-left: 50px; line-height: 24px;">
        <p>1. Bucket 名称在对象存储中是全局唯一的，并且遵守命名规范的要求。</p>
        <p>2. 命名规范：长度6 - 63的小写字母、数字、中划线，以字母或数字开始和结尾。</p>
        <p>3. 初始的bucket 是私有的（本账号读写），创建后可设置访问权限。</p>
      </div>
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
.create-bucket-storage{
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
