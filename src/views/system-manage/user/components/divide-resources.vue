<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    top="8vh"
    custom-class="add-source-tree"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">分配资源</span>
    </div>
    <div class="mytree">
      <el-tree
        v-loading="loading"
        v-if="visible"
        :default-checked-keys="resourceList"
        ref="dividetree"
        :data="treeData"
        node-key="id"
        :check-strictly="true"
        show-checkbox
        :indent="10"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        :props="defaultProps">
      </el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getTree, setRoleResource } from '@/api/system-manage'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleInfo: {
      type: Object,
      default: () => {}
    },
    resourceList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        // 清空树选中状态
        this.$refs.dividetree.setCheckedKeys([])
      }
    }
  },
  created() {
    this.loading = true
    getTree().then(res => {
      this.loading = false
      this.treeData = res.result.resTree
    }).catch(err => {
      this.loading = false
    })
  },
  data() {
    return {
      loading: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    nodeClick(node) {
      console.log(node);
    },
    confirm() {
      // 获取所有选中节点id
      let resources = this.$refs.dividetree.getCheckedKeys()

      if (!resources.length) {
        this.$message.warning('请选择需要分配的资源')
        return
      }
      setRoleResource(this.roleInfo.id, resources).then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
