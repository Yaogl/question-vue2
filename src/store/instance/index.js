// 虚拟机缓存数据
import * as types from '../mutation-types.js'
import {
  getImageList,  // 镜像
  getSshkeyList,  // 秘钥
  getServerGroupList,  // 容灾
  instanceFlavor // 类型
} from '@/api/cloud-host'
import { getSecurityGroupList, getNetworkList } from '@/api/network-service' // 安全

const state = {
  imageList: [], // 镜像列表缓存
  securityGroupList: [], // 安全组列表
  secretkeyList: [], // 秘钥对列表
  netWorkList: [], // vpv网络列表
  serverGroupList: [], // 容灾组列表
  flavorList: [], // 类型
  instanceStored: false // 是否已经缓存过数据。 后期上边列表有变化，需变成false，创建页面根据false重新拉取数据
}

const getters = {
  imageList: state => state.imageList,
  securityGroupList: state => state.securityGroupList,
  flavorList: state => state.flavorList,
  secretkeyList: state => state.secretkeyList,
  netWorkList: state => state.netWorkList,
  serverGroupList: state => state.serverGroupList,
  instanceStored: state => state.instanceStored
}

const mutations = {
  [types.INSTANCE_INIT_FINISH] (state, status) {
    state.instanceStored = status
  },
  [types.INSTANCE_INIT_IMAGE] (state, list) {
    state.imageList = list
  },
  [types.INSTANCE_INIT_SSHKEY] (state, list) {
    state.secretkeyList = list
  },
  [types.INSTANCE_INIT_SERVER_GROUP] (state, list) {
    state.serverGroupList = list
  },
  [types.INSTANCE_INIT_FLAVOR] (state, list) {
    state.flavorList = list
  },
  [types.INSTANCE_INIT_SECURITY] (state, list) {
    state.securityGroupList = list
  },
  [types.INSTANCE_INIT_NETWORK] (state, list) {
    state.netWorkList = list
  }
}

const actions = {
  createInstanceInit({ commit, dispatch }) {
    Promise.all([
      dispatch('initSshkey'),
      dispatch('initServerGroup'),
      dispatch('initFlavor'),
      dispatch('initSecurityGroup'),
      dispatch('initNetwork'),
      dispatch('initImage')
    ]).then(res => {
      commit(types.INSTANCE_INIT_FINISH, true)
    })
  },
  initImage({ commit }) {
    return new Promise(resolve => {
      getImageList().then(res => {
        commit(types.INSTANCE_INIT_IMAGE, res.result)
        resolve(true)
      })
    })
  },
  initSshkey({ commit }) {
    return new Promise(resolve => {
      getSshkeyList().then(res => {
        commit(types.INSTANCE_INIT_SSHKEY, res.result)
        resolve(true)
      })
    })
  },
  initServerGroup({ commit }) {
    return new Promise(resolve => {
      getServerGroupList().then(res => {
        commit(types.INSTANCE_INIT_SERVER_GROUP, res.result)
        resolve(true)
      })
    })
  },
  initFlavor({ commit }) {
    return new Promise(resolve => {
      instanceFlavor().then(res => {
        commit(types.INSTANCE_INIT_FLAVOR, res.result)
        resolve(true)
      })
    })
  },
  initSecurityGroup({ commit }) {
    return new Promise(resolve => {
      getSecurityGroupList().then(res => {
        commit(types.INSTANCE_INIT_SECURITY, res.result)
        resolve(true)
      })
    })
  },
  initNetwork({ commit }) {
    return new Promise(resolve => {
      getNetworkList().then(res => {
        commit(types.INSTANCE_INIT_NETWORK, res.result)
        resolve(true)
      })
    })
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
