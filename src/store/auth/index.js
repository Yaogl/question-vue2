import * as types from '../mutation-types.js'
import allBtns from '@/constant/auth-btn'
import { getUserAuth, getAllUser } from '@/api/system-manage'

const toTreeData = (data, pid) => { // 递归菜单树
  const tree = (id) => {
    let arr = []
    data.filter(item => {
      return item.parentId == id
    }).sort((prev, next) => prev.sortId - next.sortId).forEach(item => {
      let child = tree(item.id)
      const origin = {
        id: item.id,
        title: item.resourceName,
        index: item.resourceHref || (item.id + ''), // 如果是顶级菜单，需标记一个唯一的index 组件使用
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
  authBtns: {}, // 系统权限按钮集
  menuList: [], // 左侧系统菜单
  allUserList: [], // 系统所有用户
  curSecurityInfo: {} // 当前点击的安全组信息，跳转详情页面暂时带过去
}

const getters = {
  authBtns: state => state.authBtns,
  menuList: state => state.menuList,
  allUserList: state => state.allUserList,
  curSecurityInfo: state => state.curSecurityInfo
}

const mutations = {
  [types.USER_AUTH] (state, authBtns) {
    state.authBtns = authBtns
  },
  [types.USER_MENU] (state, finalMenuList) {
    state.menuList = finalMenuList
  },
  [types.SET_ALLUSER_LIST](state, list) {
    // 穿梭框需绑定key值 保证唯一
    list.map((item, index) => {
      item.index = index + 1
      item.key = item.id
    })
    state.allUserList = list
  },
  [types.SET_SECURITY_INFO] (state, info) {
    state.curSecurityInfo = info
  }
}

const actions = {
  setAllUserList({ commit, state }, item) {
    if (state.allUserList.length) return Promise.resolve(true)
    return new Promise((resolve) => {
      getAllUser({pageNum: 1, pageSize: 100000}).then(res => {
        commit(types.SET_ALLUSER_LIST, res.result.list)
        resolve(true)
      })
    })
  },
  getAuth({ commit, state, rootState }) {
    return new Promise((resolve) => {
      getUserAuth(rootState.user.userInfo.userName).then(res => {
        if (res.code === 200) {
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
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  },
  setSecurityInfo({ commit }, info) {
    commit(types.SET_SECURITY_INFO, info)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
