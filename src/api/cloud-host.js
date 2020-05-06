// 云主机接口
import request from '../utils/request'
// 获取vm示例列表
export const getInstanceList = data => {
  return request({
    url: '/bcp/v1/instance/list',
    method: 'get'
  })
}
// 启动虚拟机 {uuid: ''}
export const startInstance = data => {
  return request({
    url: '/bcp/v1/instance/start',
    method: 'post',
    data
  })
}
// 关闭虚拟机 {uuid: ''}
export const stopInstance = data => {
  return request({
    url: '/bcp/v1/instance/stop',
    method: 'post',
    data
  })
}
// 重启虚拟机 {uuid: ''，restart_flag：'SOFT'}重启标记，默认为SOFT,可以是SOFT 软重启 /HARD 硬重启
export const restartInstance = data => {
  return request({
    url: '/bcp/v1/instance/restart',
    method: 'post',
    data
  })
}
// 获取vnc链接
export const getInstanceVnc = vmid => {
  return request({
    url: `/bcp/v1/instance/vnc/${vmid}`,
    method: 'get'
  })
}
// 获取虚拟机详情
export const getInstanceDetail = vmid => {
  return request({
    url: `/bcp/v1/instance/details/${vmid}`,
    method: 'get'
  })
}
// 获取虚拟机详情
export const getInstanceStatus = vmid => {
  return request({
    url: `/bcp/v1/instance/status/${vmid}`,
    method: 'get'
  })
}
// ---------------
// 获取镜像列表
export const getImageList = (params) => {
  return request({
    url: `/bcp/v1/image/list`,
    method: 'get'
  })
}
// 获取test
export const getTest = () => {
  return request({
    url: `/api/test`,
    method: 'get'
  })
}
// 获取test4
export const getTest4 = () => {
  return request({
    url: `/api/test4`,
    method: 'get'
  })
}
