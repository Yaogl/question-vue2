import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import user from './user'
import mytree from './mytree'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   persistedState({ storage: window.sessionStorage })
  // ],

  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        user: common,
        mytree: mytree
      }
    }
  })],
  modules: {
    common,
    user,
    mytree
  }
})
