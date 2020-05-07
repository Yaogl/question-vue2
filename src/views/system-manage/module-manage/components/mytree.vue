<template lang="html">
  <div class="mytree">
    <el-tree
      ref="mytree"
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

</style>
