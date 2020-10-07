import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const defaultRouter = [{
    path: '/dashboard',
    component: () => import('../views/dashboard'),
    meta: {
      title: '系统首页'
    }
  },
  {
    path: '/create-question',
    component: () => import( /* webpackChunkName: "404" */ '../views/dashboard/create'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/404',
    component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/403',
    component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
    meta: {
      title: '403'
    }
  }
]

export default new Router({
  routes: [{
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import( /* webpackChunkName: "home" */ '../layout/Home.vue'),
      meta: {
        title: '全局'
      },
      children: defaultRouter
    },
    {
      path: '/login',
      component: () => import( /* webpackChunkName: "login" */ '../views/login/login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
