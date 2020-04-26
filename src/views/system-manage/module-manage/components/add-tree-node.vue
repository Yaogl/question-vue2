<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="add-tree-node-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">{{ isEdit ? '编辑模块' : '创建模块' }}</span>
    </div>
    <div class="body">
      <el-form label-width="120px">
        <el-form-item label="父节点名称：" v-if="curNode.title && !isEdit">
          {{ curNode.title }}
        </el-form-item>
        <el-form-item label="模块名称：">
          <el-input placeholder="请输入模块名称" v-model="formData.title"></el-input>
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
  name: 'add-tree-node',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    curNode: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    editInfo: {
      type: Object,
      default: () => {}
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
        children: [],
        id: '',
        pid: '',
        title: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$emit('confirm', this.formData)
      setTimeout(() => {
        this.handleClose()
      }, 0)
    }
  }
}
</script>

<style lang="scss">

</style>
