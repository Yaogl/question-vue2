import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import user from './user'
import mytree from './mytree'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    // persistedState({ storage: window.sessionStorage })
    persistedState({ storage: window.localStorage })
  ],
  modules: {
    common,
    user,
    mytree
  }
})
