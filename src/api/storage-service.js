// 网络相关接口
import request from '../utils/request'
// 获取所有卷信息
export const getBlockList = () => {
  return request({
    url: '/bcp/v1/volume/list',
    method: 'get'
  })
}
// 获取卷详情
export const getBlockInfo = (id) => {
  return request({
    url: `/bcp/v1/volume/info?volume_id=${id}`,
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
