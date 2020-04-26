<template>
  <div v-if="visible">
    <el-dialog :title="title" :visible.sync="visible" :before-close="beforeClose" custom-class="select-table-container" width="900px">
      <div class="">
        <el-table
          v-loading="loading"
          ref="selectTable"
          :data="tableData"
          :header-row-class-name="multiple ? '' : 'single'"
          max-height="500"
          style="width: 100%"
          :row-style="{height:'60px'}"
          @select-all="changeSelect"
          @select="changeSelect">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            v-for="(item, index) in tableColum"
            :key="index"
            :prop="item.key"
            :label="item.label"/>
          <slot/>
        </el-table>
        <el-pagination
          v-if="total > 0"
          :current-page="fetchParams.page"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="fetchParams['per-page']"
          :total="total"
          style="padding-top: 20px;"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="cancel"
        >取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    selectedList: { // 列表选中项
      type: Array,
      default: () => []
    },
    tableColum: { // 列表表头项
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: { // 弹窗组件名称
      type: String,
      default: '提示'
    },
    fetchApi: { // 列表参数异步获取 api函数
      type: Function,
      default: () => {}
    },
    multiple: {
      type: Boolean,
      default: true
    },
    format: { // 格式化数据钩子
      type: Function,
      default: (list) => list
    },
    query: { // 需要添加的搜索参数
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectedItems: [],
      tableData: [],
      loading: false,
      fetchParams: {
        'page': 1,
        'per-page': 5
      },
      total: 0
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.fetchParams.page = 1
        this.fetchParams['per-page'] = 5
        this.tableData = []
      } else {
        this.fetchParams = Object.assign(this.fetchParams, this.query)
        this.selectedItems = []
        this.selectedList.map(item => {
          this.selectedItems.push(item)
        })
        this.search()
      }
    }
  },
  methods: {
    search() {
      if (this.loading) {
        this.$message.error('正在搜索请稍后')
        return
      }
      this.loading = true
      this.fetchApi(this.fetchParams).then(list => {
        this.tableData = this.format(list.data.items)
        this.total = list.data._meta.totalCount
        this.loading = false
        this.$nextTick(() => {
          this.$refs.selectTable.clearSelection()
          this.selectedItems.map(item => {
            const index = this.tableData.findIndex(row => row.id === item.id)
            if (index > -1) {
              this.$refs.selectTable.toggleRowSelection(this.tableData[index], true)
            }
          })
        })
      })
    },
    changePages(query) {
      this.fetchParams.page = 1
      this.fetchParams['per-page'] = query
      this.search()
    },
    currentChange(page) {
      this.fetchParams.page = page
      this.search()
    },
    confirm() {
      this.$emit('selectConfirm', this.selectedItems)
      this.$emit('update:visible', false)
    },
    changeSelect(list, row) {
      if (!this.multiple) {
        this.$refs.selectTable.clearSelection()
        this.$refs['selectTable'].toggleRowSelection(row, true)
        this.selectedItems = [row]
        return
      }
      this.tableData.map(item => {
        const idx = list.findIndex(tItem => tItem.id === item.id)
        if (idx > -1) {
          const sIdx = this.selectedItems.findIndex(sItem => sItem.id === item.id)
          sIdx > -1 ? '' : this.selectedItems.push(item)
        } else {
          const sIdx = this.selectedItems.findIndex(sItem => sItem.id === item.id)
          sIdx > -1 ? this.selectedItems.splice(sIdx, 1) : ''
        }
      })
    },
    beforeClose(done) {
      this.$emit('update:visible', false)
    },
    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.select-table-container {
  .single {
    .el-checkbox {
      display: none;
    }
  }
}
</style>
