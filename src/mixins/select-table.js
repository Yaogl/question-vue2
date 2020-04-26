// 使用mixin 需要原文件中data中立一个ref的值，方便操作table选中状态
//
export default {
  data () {
    return {
      selectedItems: [], // 选中列表集合
      selectIds: [], // 选中列表id的合集
      multiple: true // 是否多选
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
        const idx = list.findIndex(tItem => tItem.id === item.id)
        if (idx > -1) {
          const sIdx = this.selectedItems.findIndex(sItem => sItem.id === item.id)
          sIdx > -1 ? '' : this.selectedItems.push(item)
        } else {
          const sIdx = this.selectedItems.findIndex(sItem => sItem.id === item.id)
          sIdx > -1 ? this.selectedItems.splice(sIdx, 1) : ''
        }
      })
    }
  }
}
