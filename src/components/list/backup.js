// 备份list组件 现在为前端过滤
/*
 * @Description: 列表通用组件 搜索条件处理等
 * @file: @/components/list
 * @version: 1.0.0
 */
import SelectTableMixins from '../../mixins/select-table'
import { randomId } from '@/utils'

export default {
  mixins: [SelectTableMixins],
  data() {
    return {
      // 页面唯一标志，缓存搜索条件用
      uniquePageName: '',
      loading: false, // 查询loading状态，页面删除等操作loading不能共用
      tableList: [], // 列表数据
      tableRefs: randomId() + '-tablelist', // 选择列表refs
      total: 0, // 数据总数
      cacheQuery: false, // 是否缓存搜索条件
      query: {}, // 搜索条件
      createdSearch: true, // 是否在页面创建时立刻搜索
      deleteMessage: '您正在进行删除操作, 是否继续?',
      // 一下为模拟分页增加，后期删除
      totalList: []
    }
  },
  created() {
    this._original = {}
    this._original.query = JSON.parse(JSON.stringify(this.query))
    if (this.cacheQuery) {
      this.mergeQuery(`${this.$route.name}-${this.uniquePageName}`)
    }
    if (this.createdSearch) {
      this.beforeSearch()
      this.fetchByPage()
    }
  },
  methods: {
    fetchApi() {
      return Promise.resolve([])
    }, // 列表搜索接口函数
    mergeQuery(type) {
      const data = JSON.parse(sessionStorage.getItem(`${type}-query`))

      if (!data) {
        return
      }

      Object.assign(this.query, data.query)
    },
    currentChange(page) {
      // el-pagination组件 current-change
      this.query.page = page
      this.fetchByPage(page)
    },
    changePages(size) {
      // el-pagination组件  size-change
      this.query.size = size
      this.query.page = 1
      this.fetchByPage(1)
    },
    search() {
      this.beforeSearch()
      this.fetchByPage(1)
    },
    fetchByPage(page = this.query.page) {
      if (this.loading) {
        this.$message.warning('正在加载，请勿重复操作')
        return
      }
      this.query.page = page
      if (this.cacheQuery) {

        // window.scrollTo(0, 0)
        sessionStorage.setItem(
          `${this.$route.name}-${this.uniquePageName}-query`,
          JSON.stringify({
            query: this.query
          })
        )
      }

      const params = {
        ...this.query
      }

      this.loading = true
      return this.fetchApi(params).then(results => {
        this.loading = false
        this.tableList = this.formatData(results.data.data || [])
        this.total = Number(results.data.total || 0) // 暂时不分页 前端假分页
        this.afterSearch()
      })
    },
    // 对结果处理的钩子
    formatData(results) {
      return results
    },
    clearQuery() { // 清除搜索条件并搜索
      this.resetQuery()
      this.search()
    },
    resetQuery() { // 清除搜索条件
      this.query = JSON.parse(JSON.stringify(this._original.query))
    },
    beforeSearch() {},
    deleteApi: function() {}, // 删除api
    afterDelete() {},
    afterSearch() {},
    deleteRow(row) { // 删除列表当前行
      this.$confirm(this.deleteMessage, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.deleteApi(row.id)
            .then(res => {
              this.$message.success('操作成功')
              this.search()
              this.afterDelete()
            })
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }

  }
}
