import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import user from './user'
import auth from './auth'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    paths:['user', 'common'] // 需要缓存的store放置，如果需要刷新重新获取，单建文件
  })],
  modules: {
    common,
    user,
    auth
  }
})
