<template lang="html">
  <div class="module-manage-container">
    <el-row>
      <el-col :span="5">
        <mytree v-loading="treeLoading" :treeData="tdata" :defaultProps="defaultProps" @setCurNode="setCurNode"/>
      </el-col>
      <el-col :span="19">
        <el-alert class="mgb20" @close="clearNode" style="height: 40px;" :title="'当前节点：' + curNode.resourceName" v-if="curNode.id"/>
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
          v-loading="loading"
          :row-style="{height: '45px'}"
          :header-row-style="{height: '50px'}"
          :data="tableList"
          style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="节点编码"/>
          <el-table-column prop="resourceName" label="节点名称"/>
          <el-table-column prop="description" label="节点描述"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="editTreeNode(scope.row)">编辑</el-button>
              <el-button type="text" @click="delTreeNode([scope.row.id])">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-row style="margin: 20px;">
          <el-col :span="12">
            <p>第{{ query.pageNum }}页，共{{ Math.ceil(total/query.pageSize) }}页，共{{ total }}条</p>
          </el-col>
          <el-col :span="12" align="right">
            <el-pagination
              :current-page="query.pageNum"
              :page-sizes="pageList"
              :page-size="query.pageSize"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="changePages"
              @current-change="currentChange"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <add-tree-node :visible.sync="visible" :parentNode="curNode" :treeNodeInfo="treeNodeInfo" @confirm="addTreeNode"/>
  </div>
</template>

<script>
import Mytree from './components/mytree.vue'
import AddTreeNode from './components/add-tree-node.vue'
import { mapGetters } from 'vuex'
import { getResourceList, getTree, getResourceInfo, delResource } from '@/api/system-manage'
import List from '@/components/list/backup'

export default {
  extends: List,
  components: {
    Mytree,
    AddTreeNode
  },
  computed: {
    ...mapGetters([
      'pageList'
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
      treeNodeInfo: {},
      treeLoading: false,
      createdSearch: false,
      query: {
        pageNum: 1,
        pageSize: 10,
        parentId: '',
        resourceName: ''
      }
    }
  },
  created() {
    this.initTree()
  },
  methods: {
    fetchApi: getResourceList,
    initTree() { // 缓存tree信息
      this.treeLoading = true
      getTree().then(res => {
        this.tdata = res.result.resTree
        this.treeLoading = false
      }).catch(err => {
        this.treeLoading = false
      })
    },
    clearNode() { // 清空选中数据
      this.tableList = []
      this.curNode = {}
      this.selectedItems = []
      this.resetQuery()
      this.total = 0
    },
    editTreeNode(node) {
      this.treeNodeInfo = node
      this.visible = true
    },
    editRow() {
      if (this.selectedItems.length > 1) {
        this.$message.warning('只能选择一个需要编辑的节点')
        return
      }
      if (!this.selectedItems.length) {
        this.treeNodeInfo = this.curNode
        this.visible = true
        return
      }
      if (this.selectedItems.length === 1) {
        this.treeNodeInfo = this.selectedItems[0]
        this.visible = true
        return
      }
    },
    add() {
      this.treeNodeInfo = {}
      this.visible = true
    },
    setCurNode(node) {
      // tree上抛出的信息不完整，查询一下数据，编辑时候用
      getResourceInfo(node.id).then(res => {
        this.curNode = res.result
        this.query.parentId = node.id
        this.search()
        // 选择后清空选中项目
        this.selectedItems = []
      }).catch(err => {
        this.loading = false
      })
    },
    delOne(target, id) {
      for (let i = 0; i < target.length; i++) {
        if (target[i].id == id) {
          target.splice(i, 1)
        } else {
          if (target[i].children.length) {
            this.delOne(target[i].children, id)
          }
        }
      }
    },
    delTreeNode(list) {
      this.$confirm('确定要删除资源吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delResource(list).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.search()
            this.list.map(id => {
              this.delOne(this.curNode.children, id)
            })
          }
        })
      }).catch((err) => {})
    },
    deleteNode() {
      if (!this.curNode.id) {
        this.$message.warning('请选择需要删除的节点')
        return
      }
      if (!this.selectedItems.length) {
        this.$confirm('当前没有选择任何节点，是否删除当前节点以及下属所有子节点？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          delResource([this.curNode.id]).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.delOne(this.tdata, this.curNode.id)
              this.clearNode()
            }
          })
        }).catch(() => {})
      } else {
        this.delTreeNode(this.selectIds)
      }
    },
    updateTreeNode(target, node) {
      for (let i = 0; i < target.length; i++) {
        if (target[i].id == node.id) {
          target[i].title = node.resourceName
        } else {
          if (target[i].children.length) {
            this.updateTreeNode(target[i].children, node)
          }
        }
      }
    },
    addTreeNode(data) {
      // if (this.curNode.id && data.id) { // 如果有父节点信息，刷新一下列表
      //   this.search()
      //   this.updateTreeNode(this.tdata, data)
      // } else {
      //
      // }
      this.search()
      this.initTree()
    }
  }
}
</script>

<style lang="scss" scoped>
.module-manage-container {
  padding: 20px;
}
</style>
