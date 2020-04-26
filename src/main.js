import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import VCharts from 'v-charts'
Vue.use(VCharts)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/index.scss'
import './layout/directives'
import 'babel-polyfill'
import './permission' // 路由跳转权限验证

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
