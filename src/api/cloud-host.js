// 云主机接口
import request from '../utils/request'
// 获取vm示例列表
export const getInstanceList = data => {
  return request({
    url: '/api/bcp/v1/instance/list',
    method: 'get'
  })
}
// 启动虚拟机 {uuid: ''}
export const startInstance = data => {
  return request({
    url: '/api/bcp/v1/instance/start',
    method: 'post',
    data
  })
}
// 关闭虚拟机 {uuid: ''}
export const stopInstance = data => {
  return request({
    url: '/api/bcp/v1/instance/stop',
    method: 'post',
    data
  })
}
// 获取vnc链接
export const getInstanceVnc = vmid => {
  return request({
    url: `/api/bcp/v1/instance/vnc/${vmid}`,
    method: 'get'
  })
}
// 获取test
export const getTest = vmid => {
  return request({
    url: `/testApi/test`,
    method: 'get'
  })
}
