import request from '../utils/request'

export const authLogin = data => {
  return request({
    url: '/api/users/login',
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
export const registerUser = (data) => {
  return request({
    url: '/api/users/register',
    method: 'post',
    data
  })
}
export const refreshTokenApi = process.env.VUE_APP_WEB_URL + '/web/captcha'
