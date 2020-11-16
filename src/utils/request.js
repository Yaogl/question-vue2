import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  timeout: 60000
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === -1 && res.message === '未登录') { // 登录超时
      Message({
        message: '请登录',
        type: 'error'
      })
      store.dispatch('loginOut')
      location.reload()
      return
    }

    if (res.code === 0) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
