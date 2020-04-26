<template lang="html">
  <div class="mytree">
    <el-tree
      :data="treeData"
      node-key="id"
      :indent="10"
      :expand-on-click-node="false"
      @node-click="nodeClick"
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>

export default {
  props: {
    treeData: {
      type: Array,
      default: () => {}
    },
    defaultProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    nodeClick(node) {
      this.$emit('setCurNode', node)
    }
  }
}
</script>

<style lang="scss" scoped>
.module-manage-container {
  .mytree /deep/ {
    .el-tree > .el-tree-node:after {
      border-top: none;
    }
    .el-tree-node {
      position: relative;
      padding-left: 16px;
    }
    //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
    .el-tree-node__expand-icon.is-leaf {
      display: none;
    }
    .el-tree > .el-tree-node > .el-tree-node__content .el-tree-node__expand-icon.is-leaf {
      display: block;
    }
    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree > .el-tree-node:before {
      border-left: none;
    }

    .el-tree > .el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:before {
      border-left: 1px dashed #ccc;
      bottom: 0;
      height: 100%;
      top: -26px;
      width: 1px;
    }

    .el-tree-node:after {
      border-top: 1px dashed #ccc;
      height: 20px;
      top: 12px;
      width: 24px;
    }
  }
}
</style>
