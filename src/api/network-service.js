// 网络相关接口
import request from '../utils/request'
// 获取vpc列表
export const getNetworkList = () => {
  return request({
    url: '/api/network/list/v1',
    method: 'get'
  })
}
// 获取vpc网络详情
export const getVpnNetWorkInfo = (id) => {
  return request({
    url: '/api/network/details/v1?vpcId=' + id,
    method: 'get'
  })
}
// 获取子网列表
export const getSubnetList = () => {
  return request({
    url: '/api/network/subnet/list/v1',
    method: 'get'
  })
}
// 获取子网详情
export const getSubnetInfo = (id) => {
  return request({
    url: '/api/network/subnet/details/v1?networkUuid=' + id,
    method: 'get'
  })
}
// 获取子网列表（指定vpc）
export const getSubnetListInfo = params => {
  return request({
    url: '/api/network/subnet/info/v1',
    method: 'get',
    params
  })
}
// 获取子网的端口列表
export const getSubnetPortList = params => {
  return request({
    url: '/api/network/subnet/list/ports/v1',
    method: 'get',
    params
  })
}
// 获取子网的虚拟机列表
export const getSubnetVirtualList = params => {
  return request({
    url: '/api/network/subnet/list/instances/v1',
    method: 'get',
    params
  })
}
// 获取安全组列表
export const getSecurityGroupList = params => {
  return request({
    url: '/api/network/securityGroup/list/v1',
    method: 'get',
    params
  })
}
// 获取防火墙列表
export const getFirewallList = params => {
  return request({
    url: '/api/network/firewall/list/v1',
    method: 'get',
    params
  })
}
