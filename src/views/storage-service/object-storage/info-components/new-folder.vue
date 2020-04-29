<!-- 新建文件夹 -->
<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="new-folder-storage"
    :before-close="handleClose">
    <div slot="title">
      <span>新建目录</span>
    </div>
    <div class="body">
      <el-form :model="formData" :rules="rules" label-width="120px" @submit.native.prevent>
        <el-form-item label="目录名称：" prop="name">
          <el-input placeholder="请输目录名称" class="input-width-2" v-model="formData.name"></el-input>
        </el-form-item>
      </el-form>
      <p>命名规范：字母数字或中文等字符，第一个字符不能为（/）,编码后长度在1-256之间。</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'new-folder',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.formData.name = ''
      }
    }
  },
  data() {
    return {
      formData: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入文件名称', trigger: 'change' },
          { validator: this.validFolderName(), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    validFolderName() {
      return (rule, value, callback) => {
        console.log(value);
        let reg = new RegExp('[`*|\\\\"<\\/>:?？%^、&]')
        if (reg.test(value)) {
          return callback(new Error('文件名不能包含特殊字符'))
        } else {
          return callback()
        }
      }
    },
    confirm() {
    }
  }
}
</script>

<style lang="scss">
.new-folder-storage{
}
</style>
