import * as types from '../mutation-types.js'
import { dateFormat } from '@/utils'
import { removeToken } from '@/utils/auth'
import router from '../../router'

const state = {
  userInfo: {}, // 登录之后获取个人信息
  loginTime: ''
}

const getters = {
  userInfo: state => state.userInfo,
  loginTime: state => state.loginTime
}

const mutations = {
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.LOGIN_OUT](state, userInfo) {
    state.userInfo = {} // 清空用户数据
    removeToken() // 清空token
    router.push('/login')
  },
  [types.LOGIN_TIME](state, time) {
    state.loginTime = time
  }
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit(types.SET_USERINFO, userInfo)
  },
  loginOut({ commit }) { // 退出登录，清空信息
    commit(types.LOGIN_OUT)
  },
  setLoginTime({ commit }) {
    const time = dateFormat('YYYY-mm-dd HH:MM', new Date())
    commit(types.LOGIN_TIME, time)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
