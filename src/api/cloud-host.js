// 云主机接口
import request from '../utils/request'
// 获取vm示例列表
export const getInstanceList = data => {
  return request({
    url: '/api/instance/list/v1',
    method: 'get'
  })
}
// 启动虚拟机 {uuid: ''}
export const startInstance = data => {
  return request({
    url: '/api/instance/start/v1',
    method: 'post',
    data
  })
}
// 关闭虚拟机 {uuid: ''}
export const stopInstance = data => {
  return request({
    url: '/api/instance/stop/v1',
    method: 'post',
    data
  })
}
// 重启虚拟机 {uuid: ''，restart_flag：'SOFT'}重启标记，默认为SOFT,可以是SOFT 软重启 /HARD 硬重启
export const restartInstance = data => {
  return request({
    url: '/api/instance/restart/v1',
    method: 'post',
    data
  })
}
// 获取vnc链接
export const getInstanceVnc = vmid => {
  return request({
    url: `/api/instance/vnc/v1?vmid=${vmid}`,
    method: 'get'
  })
}
// 获取虚拟机详情
export const getInstanceDetail = vmid => {
  return request({
    url: `/api/instance/details/v1?uuid=${vmid}`,
    method: 'get'
  })
}
// 获取虚拟机详情
export const getInstanceStatus = vmid => {
  return request({
    url: `/api/instance/status/v1?uuid=${vmid}`,
    method: 'get'
  })
}
// ---------------
// 获取镜像列表
export const getImageList = (params) => {
  return request({
    url: `/api/instance/image/list/v1`,
    method: 'get'
  })
}
// ----------------
// 获取秘钥列表
export const getSshkeyList = (params) => {
  return request({
    url: `/api/sshkey/list/v1`,
    method: 'get'
  })
}
// 容灾列表
export const getServerGroupList = (params) => {
  return request({
    url: '/api/serverGroup/list/v1',
    method: 'get'
  })
}
// 容灾详情
export const getServerGroupInfo = (id) => {
  return request({
    url: `/api/serverGroup/details/v1?groupId=${id}`,
    method: 'get'
  })
}
