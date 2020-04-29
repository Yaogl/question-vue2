<!-- 上传文件 -->
<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="slice-upload-storage"
    :before-close="handleClose">
    <div slot="title">
      <span>上传文件</span>
    </div>
    <div class="body">
      <el-form :model="formData" :rules="rules" label-width="120px" @submit.native.prevent>
        <el-form-item label="上传位置：" prop="name">
          test/test/test
        </el-form-item>
        <el-form-item label="选择文件：" prop="name">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
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
