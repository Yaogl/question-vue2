import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrls } from './baseUrl'
import { getToken, setToken } from './auth'
import { refreshTokenApi } from '@/api/login'

const service = axios.create({
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 20000
})


service.interceptors.request.use(
  config => {
    // 请求地址不一致，需要通过判断添加baseurl
    const urlname = config.url.indexOf('/bcp') === 0 ? 'bcp' : 'web'
    config.url = baseUrls[urlname] + config.url
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.headers.authorization) {
      setToken(response.headers.authorization)
    }
    const res = response.data

    if (res.code === 100404) { // 登录超时
      Message({
        message: res.msg,
        type: 'error'
      })
      return store.dispatch('loginOut')
    }

    if (res.ret_code === 200 || res.code === 200 || res.code === 200002) {
      return Promise.resolve(res)
    } else {
      if (res.resultMsg) {
        Message({
          message: res.resultMsg,
          type: 'error'
        })
      }
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
