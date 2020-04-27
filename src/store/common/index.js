import * as types from '../mutation-types.js'

const state = {
  tagsList: [], // 页面tab缓存页面
  sideBarCollapse: false, // 侧边菜单是否折叠
  isFullScreen: false, // 是否全屏显示
  pageList: [5, 10, 20, 30, 50, 100] // 整站分页条数列表
}

const getters = {
  tagsList: state => state.tagsList,
  sideBarCollapse: state => state.sideBarCollapse,
  isFullScreen: state => state.isFullScreen,
  pageList: state => state.pageList
}

const mutations = {
  [types.SET_SIDEBAR_COLLAPSE](state, status) {
    state.sideBarCollapse = status
  },
  [types.SET_FULL_SCREEN](state, status) {
    state.isFullScreen = status
  },
  [types.DELETE_TAGS_ITEM](state, index) { // 删除一个tags
    state.tagsList.splice(index, 1)
  },
  [types.SET_TAGS_LIST](state, item) {
    state.tagsList.push(item)
  }
}

const actions = {
  setSideBarCollapse({ commit }, status) {
    commit(types.SET_SIDEBAR_COLLAPSE, status)
  },
  setFullScreen({ commit }, status) {
    commit(types.SET_FULL_SCREEN, status)
  },
  deleteTagsItem({ commit }, index) {
    commit(types.DELETE_TAGS_ITEM, index)
  },
  pushTagsItem({ commit }, item) {
    commit(types.SET_TAGS_LIST, item)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
