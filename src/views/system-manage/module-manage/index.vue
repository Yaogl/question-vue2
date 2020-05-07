<template lang="html">
  <div class="module-manage-container">
    <el-row>
      <el-col :span="5">
        <mytree :treeData="tdata" :defaultProps="defaultProps" @setCurNode="setCurNode"/>
      </el-col>
      <el-col :span="19">
        <el-alert class="mgb20" @close="clearNode" style="height: 40px;" :title="'当前节点：' + curNode.title" v-if="curNode.title"/>
        <div class="mgb20">
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="editRow">修改</el-button>
          <el-button type="primary" @click="deleteNode">删除</el-button>
        </div>

        <el-table
          v-if="tableList"
          :ref="tableRefs"
          @select-all="changeSelect"
          @select="changeSelect"
          :row-style="{height: '50px'}"
          :header-row-style="{height: '50px'}"
          :data="tableList"
          style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="title" label="名称"/>
          <el-table-column prop="title" label="名称"/>
        </el-table>
      </el-col>
    </el-row>
    <add-tree-node :visible.sync="visible" :curNode="curNode" :isEdit="isEdit" :editInfo="editInfo" @confirm="addTreeNode"/>
  </div>
</template>

<script>
import Mytree from './components/mytree.vue'
import AddTreeNode from './components/add-tree-node.vue'
import { mapGetters, mapActions } from 'vuex'
import SelectTableMixins from '@/mixins/select-table'

export default {
  components: {
    Mytree,
    AddTreeNode
  },
  mixins: [ SelectTableMixins ],
  computed: {
    ...mapGetters([
      'treeData',
      'nodeId'
    ])
  },
  data() {
    return {
      tdata: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      curNode: {},
      visible: false,
      tableRefs: 'treetable',
      editInfo: {},
      isEdit: false
    }
  },
  created() {
    this.tdata = JSON.parse(JSON.stringify(this.treeData))
  },
  methods: {
    ...mapActions([
      'setTreeData',
      'setNodeId'
    ]),
    clearNode() {
      this.tableList = []
      this.curNode = {}
      this.selectedItems = []
    },
    editRow() {
      this.visible = true
      this.isEdit = true
      if (this.selectedItems.length > 1) {
        this.$message.warning('请选择一个需要编辑的节点')
        return
      }
      if (!this.selectedItems.length) {
        this.editInfo = this.curNode
        return
      }
      if (this.selectedItems.length === 1) {
        this.editInfo = this.selectedItems[0]
        return
      }
    },
    add() {
      this.visible = true
      this.isEdit = false
    },
    setCurNode(node) {
      this.curNode = node
      this.tableList = node.children
      // 选择后清空选中项目
      this.selectedItems = []
    },
    delOne(target, node) {
      for (let i = 0; i < target.length; i++) {
        if (target[i].id === node.id) {
          target.splice(i, 1)
          this.setTreeData(JSON.parse(JSON.stringify(this.tdata)))
        } else {
          if (target[i].children.length) {
            this.delOne(target[i].children, node)
          }
        }
      }
    },
    deleteNode() {
      if (!this.selectedItems.length) {
        this.$confirm('当前没有选择任何节点，是否删除当前节点以及下属所有子节点？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.delOne(this.tdata, this.curNode)
          this.curNode = {}
        }).catch(() => {})
      } else {
        this.selectedItems.map(item => {
          this.delOne(this.curNode.children, item)
        })
      }
    },
    addTreeNode(data) {
      data.id = this.nodeId
      this.setNodeId(this.nodeId + 1)
      if (this.curNode && this.curNode.id) {
        this.curNode.children.push(data)
      } else {
        this.tdata.push(data)
      }
      this.setTreeData(JSON.parse(JSON.stringify(this.tdata)))
    }
  }
}
</script>

<style lang="scss" scoped>
.module-manage-container {
  padding: 20px;
}
</style>
