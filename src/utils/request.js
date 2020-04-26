import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

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
    console.log(res);
    if (res.success && res.success !== 'false') {
      return Promise.resolve(res)
    } else {
      // 失败success为flase 返回reject数据
      Message({
        message: res.msg,
        type: 'error'
      })
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
