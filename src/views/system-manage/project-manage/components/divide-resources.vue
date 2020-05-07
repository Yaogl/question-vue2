<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="add-tree-node-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">分配资源</span>
    </div>
    <div class="mytree">
      <el-tree
        ref="dividetree"
        :data="treeData"
        node-key="id"
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
import { mapGetters } from 'vuex'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters([
      'treeData'
    ])
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
      },
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

      console.log(this.$refs.dividetree.getCheckedNodes());// 获取所有选中节点
    }
  }
}
</script>

<style lang="scss">

</style>
