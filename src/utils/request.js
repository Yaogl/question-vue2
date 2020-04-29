import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

axios.defaults.withCredentials = true
const service = axios.create({
  timeout: 20000 // request timeout
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.ret_code === 200 || res.code === 200) {
      return Promise.resolve(res)
    } else {
      // 失败success为flase 返回reject数据
      // Message({
      //   message: '请求失败，请稍后再试',
      //   type: 'error'
      // })
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
