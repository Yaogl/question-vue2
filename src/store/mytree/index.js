import * as types from '../mutation-types.js'
// 仅供开发测试tree组件用
//
const state = {
  treeData: [],
  nodeId: 1
}

const getters = {
  treeData: state => state.treeData,
  nodeId: state => state.nodeId
}

const mutations = {
  ['SET_TREE_DATA'](state, treeData) {
    console.log(treeData);
    state.treeData = treeData
  },
  ['SET_NODE_ID'](state, id) {
    console.log(id);
    state.nodeId = id
  }
}

const actions = {
  setTreeData({ commit }, treeData) {
    commit('SET_TREE_DATA', treeData)
  },
  setNodeId({ commit }, id) {
    commit('SET_NODE_ID', id)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
