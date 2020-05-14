// 路由跳转时的权限验证文件
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/403', '/403']

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getToken()
  if (token ) { // 如果有token 已经登录
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.getters.menuList.length) {
        store.dispatch('getAuth').then(res => {
          next()
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.dispatch('loginOut')
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
