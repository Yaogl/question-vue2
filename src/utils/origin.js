import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrls } from './baseUrl'
import { getToken, setToken } from './auth'
import { refreshTokenApi } from '@/api/login'

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
service.setToken = (token) => {
  service.defaults.headers['X-Token'] = token
  window.localStorage.setItem('token', token)
}

function refreshToken () {
    // service是当前request.js中已创建的axios实例
    return service.post('/refreshtoken').then(res => res.data)
}

// 创建一个axios实例
const service = axios.create({
  timeout: 300000,
  headers: {
    'X-Token': getToken() // headers塞token
  }
})

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

service.interceptors.request.use(
  config => {
    // 请求地址不一致，需要通过判断添加baseurl
    const urlname = config.url.indexOf('/bcp') === 0 ? 'bcp' : 'web'
    config.url = baseUrls[urlname] + config.url
    // if (getToken()) {
    //   config.headers['Authorization'] = getToken()
    // }
    console.log(config, 78);
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(response => {
  const { code } = response.data
  if (code === 1234) {
    const config = response.config
    if (!isRefreshing) {
      isRefreshing = true
      return refreshToken().then(res => {
        const { token } = res.data
        service.setToken(token)
        config.headers['X-Token'] = token
        // 已经刷新了token，将所有队列中的请求进行重试
        requests.forEach(cb => cb(token))
        requests = []
        return service(config)
      }).catch(res => {
        // 刷新token失败，刷新页面
        window.location.href = '/'
      }).finally(() => {
        isRefreshing = false
      })
    } else {
      // 正在刷新token，将返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push((token) => {
          config.baseURL = ''
          config.headers['X-Token'] = token
          resolve(service(config))
        })
      })
    }
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default service
