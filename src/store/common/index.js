import * as types from '../mutation-types.js'
import menuList from '@/layout/menuList'
import * as projectApi from '@/api/system-manage'

const getBreadcrumb = (list, path) => {
  for (var i in list) {
    if (list[i].index == path) {
      return [list[i]]
    }
    if (list[i].children) {
      var ro = getBreadcrumb(list[i].children, path);
      if (ro !== undefined) {
        return [].concat(list[i], ro)
      }
    }
  }
}

const state = {
  tagsList: [], // 页面tab缓存页面
  sideBarCollapse: false, // 侧边菜单是否折叠
  isFullScreen: false, // 是否全屏显示
  breadcrumbList: [], // 面包屑导航列表
  pageList: [5, 10, 20, 30, 50, 100], // 整站分页条数列表
  projectList: [], // 平台项目列表
  curProjectInfo: {}, // 当前选择的项目
  quotaList: [], // 项目配额列表
  quotaLoading: false
}

const getters = {
  tagsList: state => state.tagsList,
  sideBarCollapse: state => state.sideBarCollapse,
  isFullScreen: state => state.isFullScreen,
  pageList: state => state.pageList,
  breadcrumbList: state => state.breadcrumbList,
  projectList: state => state.projectList,
  curProjectInfo: state => state.curProjectInfo,
  quotaList: state => state.quotaList,
  quotaLoading: state => state.quotaLoading
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
  },
  [types.SET_BREADCRUMB_LIST](state, list) {
    state.breadcrumbList = list
  },
  [types.SET_PROJECT_LIST](state, list) {
    state.projectList = list
  },
  [types.SET_CUR_PROJECT](state, info) {
    state.curProjectInfo = info
  },
  [types.SET_QUOTA_LIST](state, list) {
    state.quotaList = list
  },
  [types.SET_QUOTA_LOADING](state, status) {
    state.quotaLoading = status
  },
  [types.PUSH_BREADCRUMB_LIST](state, item) {
    if (state.breadcrumbList.length > 2) {
      state.breadcrumbList[2] = item
    } else {
      state.breadcrumbList.push(item)
    }
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
  },
  setBreadcrumbList({ commit }, router) {
    let list = getBreadcrumb(menuList, router.path)
    if (list) {
      commit(types.SET_BREADCRUMB_LIST, list)
    } else {
      commit(types.PUSH_BREADCRUMB_LIST, {
        index: router.path,
        title: router.meta.title
      })
    }
  },
  getProjectList({ commit, dispatch, state }) {
    projectApi.projectList({
      pageNum: 1,
      pageSize: 100000
    }).then(res => {
      if (res.code === 200) {
        const list = res.result.list
        commit(types.SET_PROJECT_LIST, list)
        if (state.curProjectInfo.id) {
          let idx = list.findIndex(item => item.id == state.curProjectInfo.id)
          idx > -1 ? '' : (list.length ? dispatch('setCurProject', list[0]) : '')
        } else {
          list.length ? dispatch('setCurProject', list[0]) : ''
        }
      }
    })
  },
  setCurProject({ commit, dispatch }, project) {
    commit(types.SET_CUR_PROJECT, project)
    dispatch('getProjectQuota', project)
  },
  getProjectQuota({ commit }, project) {
    commit(types.SET_QUOTA_LOADING, true)
    projectApi.getProjectQuota(project.uuid).then(res => {
      if (res.code === 200) {
        commit(types.SET_QUOTA_LIST, res.result)
      }
      commit(types.SET_QUOTA_LOADING, false)
    }).catch(err => {
      commit(types.SET_QUOTA_LOADING, false)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
