import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrls } from './baseUrl'
import { getToken, setToken } from './auth'
import { refreshTokenApi } from '@/api/login'

const service = axios.create({
  baseURL: 'http://10.255.128.190:81',
  timeout: 20000
})


service.interceptors.request.use(
  config => {
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
        message: res.resultMsg,
        type: 'error'
      })
      store.dispatch('loginOut')
      location.reload()
      return
    }

    if (res.code === 200 || res.code === 200002) {
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
