import * as types from '../mutation-types.js'

const state = {
  userInfo: {}, // 登录之后获取个人信息
}

const getters = {
  userInfo: state => state.userInfo
}

const mutations = {
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.LOGIN_OUT](state, userInfo) {
    state.userInfo = {} // 清空用户数据
  }
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit(types.SET_USERINFO, userInfo)
  },
  loginOut({ commit }) { // 退出登录，清空信息
    commit(types.LOGIN_OUT)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
