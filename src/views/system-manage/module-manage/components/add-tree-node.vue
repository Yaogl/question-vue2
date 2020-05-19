<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="add-tree-node-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">{{ treeNodeInfo.id ? '编辑资源' : '创建资源' }}</span>
    </div>
    <div class="body">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="add-node-form">
        <el-form-item :label="isEditParentNode ? '当前节点名称：' : '父节点名称：'" v-if="parentNode.id">
          {{ parentNode.resourceName }}
        </el-form-item>
        <el-form-item label="资源名称：" prop="resourceName">
          <el-input placeholder="请输入资源名称" v-model="formData.resourceName"></el-input>
        </el-form-item>
        <el-form-item label="资源描述：" prop="description">
          <el-input placeholder="请输入资源名称" type="textarea" :rows="3" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="资源排序：" prop="sortId">
          <el-input type="number" min="0" placeholder="请输入资源排序" v-model.trim="formData.sortId"></el-input>
        </el-form-item>
        <el-form-item label="资源类型：">
          <el-radio-group v-model="formData.type" @change="changeType">
            <el-radio-button label="menu">菜单</el-radio-button>
            <el-radio-button label="button">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formData.type === 'menu'" label="菜单路径：" prop="resourceHref">
          <el-input placeholder="请输入菜单路径" v-model.trim="formData.resourceHref"></el-input>
        </el-form-item>
        <el-form-item v-if="formData.type === 'button'" label="按钮标识：" prop="resourceCode">
          <el-input placeholder="请输入按钮标识" v-model.trim="formData.resourceCode"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createResource } from '@/api/system-manage'
import { isInteger } from '@/utils/validate'

export default {
  name: 'add-tree-node',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    parentNode: { // 父节点信息
      type: Object,
      default: () => {}
    },
    treeNodeInfo: { // 当前编辑的信息
      type: Object,
      default: () => {}
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
        setTimeout(() => {

          this.$refs['add-node-form'].clearValidate()
          console.log(JSON.stringify(this.formData, 2, 2));
        }, 0)
      } else {
        this.resetWith()
      }
    }
  },
  computed: {
    isEditParentNode() { // 如果父节点信息和编辑信息相同，则编辑的信息为父节点本身
      return this.parentNode.id === this.treeNodeInfo.id
    }
  },
  data() {
    return {
      formData: {
        description: '',
        resourceName: '',
        sortId: '',
        resourceHref: '', // 菜单路由地址
        resourceCode: '', // 按钮标识
        type: 'menu',
        parentId: '0'
      },
      loading: false,
      rules: {
        resourceName: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          { max: 50, message: '您输入的字数长度超出限制，请重新输入', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入资源描述', trigger: 'blur' },
          { max: 250, message: '您输入的字数长度超出限制，请重新输入', trigger: 'change' }
        ],
        resourceCode: [
          { required: true, message: '请输入按钮标识', trigger: 'blur' }
        ],
        sortId: [
          { validator: isInteger(this), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    resetWith() {
      if (this.treeNodeInfo.id) {
        Object.assign(this.formData, this.treeNodeInfo)
      } else {
        this.formData.parentId = this.parentNode.id || 0
      }
    },
    changeType(name) {
      if (name === 'menu') this.formData.resourceCode = ''
      else this.formData.resourceHref = ''
    },
    confirm() {
      this.$refs['add-node-form'].validate(valid => {
        if (valid) {
          this.loading = true
          createResource(this.formData).then(res => {
            this.loading = false
            this.$emit('confirm', this.formData)
            setTimeout(() => {
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
