// 使用mixin 需要原文件中data中立一个ref的值，方便操作table选中状态
//
export default {
  data () {
    return {
      tableList: [],
      selectedItems: [], // 选中列表集合
      selectIds: [], // 选中列表id的合集
      multiple: true, // 是否多选
      uniqueName: 'id' // 外部定义需要通过什么来判断列表唯一
    }
  },
  mounted() {
    if (!this.multiple) { // 如果没有多选，去掉全选按钮
      this.$nextTick(() => {
        const theader = this.$refs[this.tableRefs].$el.getElementsByClassName('el-table__header-wrapper')[0]
        if (theader) {
          const checkbox = theader.getElementsByClassName('el-checkbox')[0]
          checkbox && (checkbox.style.display = 'none')
        }
      })
    }
  },
  methods: {
    changeSelect(list, row) {
      if (!this.multiple) {
        this.$refs[this.tableRefs].clearSelection()
        this.$refs[this.tableRefs].toggleRowSelection(row, true)
        this.selectedItems = [row]
        return
      }
      this.tableList.map(item => {
        const idx = list.findIndex(tItem => tItem[this.uniqueName] === item[this.uniqueName])
        if (idx > -1) {
          const sIdx = this.selectedItems.findIndex(sItem => sItem[this.uniqueName] === item[this.uniqueName])
          sIdx > -1 ? '' : this.selectedItems.push(item)
        } else {
          const sIdx = this.selectedItems.findIndex(sItem => sItem[this.uniqueName] === item[this.uniqueName])
          sIdx > -1 ? this.selectedItems.splice(sIdx, 1) : ''
        }
      })
    },
    clearSelection() {
      this.$refs[this.tableRefs].clearSelection()
      this.selectedItems = []
    }
  }
}
