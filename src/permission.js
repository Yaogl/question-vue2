// 路由跳转时的权限验证文件
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  NProgress.start()
  const role = getToken()
  if (role && to.path === '/login') {
    next('/')
    NProgress.done()
  }
  if (!role && to.path !== '/login') {
    next('/login')
    NProgress.done()
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
