// 路由跳转时的权限验证文件

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  NProgress.start()
  const role = store.getters.userInfo.uname;
  if (role && to.path === '/login') {
    next('/')
    NProgress.done()
  }
  if (!role && to.path !== '/login') {
    next('/login')
    NProgress.done()
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403')
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
