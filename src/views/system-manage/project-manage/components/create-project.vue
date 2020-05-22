<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="add-project"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">{{ projectInfo.id ? '编辑项目' : '创建项目' }}</span>
    </div>
    <div class="body">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="project-form" @submit.native.prevent>
        <el-form-item label="项目名称：" prop="name">
          <el-input placeholder="请输入项目名称" v-model.trim="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="项目备注：" prop="desc">
          <el-input placeholder="请输入项目备注" type="textarea" :rows="3" v-model.trim="formData.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { projectAdd } from '@/api/system-manage'
import { mapActions } from 'vuex'

export default {
  name: 'add-project',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    projectInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
        setTimeout(() => {
          this.$refs['project-form'].resetFields()
        }, 0)
      } else {
        if (this.projectInfo.id) {
          this.formData.id = this.projectInfo.id
          this.formData.name = this.projectInfo.name
          this.formData.desc = this.projectInfo.desc
        }
      }
    }
  },
  data() {
    return {
      formData: {
        name: '',
        desc: ''
      },
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { max: 50, message: '您输入的字数长度超出限制，请重新输入', trigger: 'change' }
        ],
        desc: [
          { max: 250, message: '您输入的字数长度超出限制，请重新输入', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'getProjectList'
    ]),
    handleClose() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$refs['project-form'].validate(valid => {
        if (valid) {
          this.loading = true
          projectAdd(this.formData).then(res => {
            this.$message.success('保存成功')
            this.$emit('confirm')
            this.getProjectList()
            setTimeout(() => {
              this.loading = false
              this.handleClose()
            }, 0)
          }).catch(err => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
