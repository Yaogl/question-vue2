import request from '../utils/request'

export const authLogin = data => {
  return request({
    url: '/web/auth/login',
    method: 'post',
    data
  })
}
export const loginOut = () => {
  return request({
    url: '/auth/login',
    method: 'post'
  })
}
export const getVersionCode = () => {
  return request({
    url: '/web/captcha',
    method: 'get'
  })
}
export const refreshTokenApi = process.env.VUE_APP_WEB_URL + '/web/captcha'
