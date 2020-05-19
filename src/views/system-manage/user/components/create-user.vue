<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="add-role"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">{{ roleInfo.id ? '编辑用户' : '新增用户' }}</span>
    </div>
    <div class="body">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="role-form">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model.trim="formData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" prop="description">
          <el-input placeholder="请输入角色描述" type="textarea" :rows="3" v-model.trim="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="角色排序：" prop="sortId">
          <el-input type="number" min="0" placeholder="请输入角色排序" v-model.trim="formData.sortId"></el-input>
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
import { roleAdd } from '@/api/system-manage'
import { isInteger } from '@/utils/validate'

export default {
  name: 'add-role',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
        setTimeout(() => {
          this.$refs['role-form'].resetFields()
        }, 0)
      } else {
        this.resetWith()
      }
    }
  },
  data() {
    return {
      formData: {
        roleName: '',
        description: '',
        sortId: '1'
      },
      loading: false,
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' },
          { max: 50, message: '您输入的字数长度超出限制，请重新输入', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'change' },
          { max: 250, message: '您输入的字数长度超出限制，请重新输入', trigger: 'change' }
        ],
        sortId: [
          { validator: isInteger(this), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetWith() {
      if (this.roleInfo.id) {
        this.formData.id = this.roleInfo.id
        Object.keys(this.formData).map(key => {
          if (this.roleInfo[key]) {
            this.formData[key] = this.roleInfo[key]
          }
        })
      }
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$refs['role-form'].validate(valid => {
        if (valid) {
          this.loading = true
          roleAdd(this.formData).then(res => {
            this.$emit('confirm')
            setTimeout(() => {
              this.handleClose()
              this.loading = false
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
