import request from '../utils/request'

export const login = data => {
  return request({
    url: '/api/cloud/login',
    method: 'post',
    data
  })
}
export const queryOrgTree = () => {
  return request({
    url: '/api/cloud/org/queryOrgTree',
    method: 'post'
  })
}
