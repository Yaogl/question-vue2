import * as types from '../mutation-types.js'
import { dateFormat } from '@/utils'
import { removeToken } from '@/utils/auth'
import router from '../../router'
import allBtns from '@/constant/auth-btn'
import { getUserAuth } from '@/api/system-manage'

const toTreeData = (data, pid) => { // 递归形成数结构
  const tree = (id) => {
    let arr = []
    data.filter(item => {
      return item.parentId == id
    }).forEach(item => {
      let child = tree(item.id)
      const origin = {
        id: item.id,
        title: item.resourceName,
        index: item.resourceHref || (item.id + ''),
        children: child
      }
      if (item.parentId == '0') origin.icon = item.description
      if (!child.length) delete origin.children
      arr.push(origin)
    })
    return arr
  }
  return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
}

const state = {
  userInfo: {}, // 登录之后获取个人信息
  loginTime: '',
  authBtns: {}, // 系统权限按钮集
  menuList: [] // 左侧系统菜单
}

const getters = {
  userInfo: state => state.userInfo,
  loginTime: state => state.loginTime,
  authBtns: state => state.authBtns,
  menuList: state => state.menuList
}

const mutations = {
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.LOGIN_OUT](state, userInfo) {
    state.userInfo = {} // 清空用户数据
    removeToken() // 清空token
    sessionStorage.clear()
    router.push('/login')
  },
  [types.LOGIN_TIME](state, time) {
    state.loginTime = time
  },
  [types.USER_AUTH] (state, authBtns) {
    state.authBtns = authBtns
  },
  [types.USER_MENU] (state, finalMenuList) {
    state.menuList = finalMenuList
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
  },
  getAuth({ commit, state }) {
    return getUserAuth(state.userInfo.userName).then(res => {
      let menu = res.result.list.filter(item => item.type === 'menu')
      let btns = res.result.list.filter(item => item.type === 'button')
      let authBtns = {}
      for (let item of btns) {
        for (let kk in allBtns) {
          if (allBtns[kk] === item.resourceCode) {
            authBtns[kk] = allBtns[kk]
          }
        }
      }
      commit(types.USER_AUTH, authBtns)
      commit(types.USER_MENU, toTreeData(menu, '0'))
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
