import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrls } from './baseUrl'
import { getToken, setToken } from './auth'
import { refreshTokenApi } from '@/api/login'

function refreshToken () {
    // service是当前request.js中已创建的axios实例
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 5000)
    })
}

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
// 创建一个axios实例
const service = axios.create({
  timeout: 300000
})

service.interceptors.request.use(
  config => {
    // 请求地址不一致，需要通过判断添加baseurl
    const urlname = config.url.indexOf('/bcp') === 0 ? 'bcp' : 'web'
    config.url = baseUrls[urlname] + config.url
    // if (getToken()) {
    //   config.headers['Authorization'] = getToken()
    // }
    config.cancelToken = source.token;
    return config
  },
  error => {
    Promise.reject(error)
  }
)


let retryRequest = [] //存放token 过期的请求
let isRefresh = false // 是否在请求新的token

// HTTPresponse拦截
service.interceptors.response.use(response => {
  const { code, ret_code } = response.data
  console.log(code, ret_code);
  if (code === 100401 || ret_code === 200) {
    // console.log(1111111);
    if (!isRefresh) {
      isRefresh = true
      return refreshToken().then(data => {
        retryRequest.forEach(cb => {
          cb()
        })
        isRefresh = false
        retryRequest = []
        return axios(response.config)
      })
    }else {
      source.cancel();
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        retryRequest.push(() => {
          resolve(axios(response.config))
        })
      })
    }
  } else {
    return Promise.reject(response)
  }

})

export default service
