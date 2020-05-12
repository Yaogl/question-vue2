import * as types from '../mutation-types.js'
// 仅供开发测试tree组件用
const state = {
  treeData: []
}

const getters = {
  treeData: state => state.treeData
}

const mutations = {
  ['SET_TREE_DATA'](state, treeData) {
    state.treeData = treeData
  }
}

const actions = {
  setTreeData({ commit }, treeData) {
    commit('SET_TREE_DATA', treeData)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
