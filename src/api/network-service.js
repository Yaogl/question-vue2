// 网络相关接口
import request from '../utils/request'
// 获取vpc列表
export const getNetworkList = () => {
  return request({
    url: '/bcp/v1/network/list',
    method: 'get'
  })
}
// 获取子网列表
export const getSubnetList = () => {
  return request({
    url: '/bcp/v1/subnet/list',
    method: 'get'
  })
}
// 获取子网列表（指定vpc）
export const getSubnetListInfo = params => {
  return request({
    url: '/bcp/v1/subnet/list',
    method: 'get',
    params
  })
}
