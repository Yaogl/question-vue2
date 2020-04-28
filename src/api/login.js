import request from '../utils/request'

export const login = data => {
  return request({
    url: '/api/cloud/login',
    method: 'post',
    data
  })
}
export const loginOut = () => {
  return request({
    url: '/api/cloud/loginout',
    method: 'post'
  })
}
