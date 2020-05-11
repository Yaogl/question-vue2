// 系统相关接口
import { getIdsStr } from '@/utils'
import request from '../utils/request'
// 创建 修改 角色
export const roleAdd = (data) => {
  if (data.id) {
    return request({
      url: '/api/role/update/info',
      method: 'post',
      data
    })
  }
  return request({
    url: '/api/role/add/info',
    method: 'post',
    data
  })
}
// 角色列表
export const roleList = (params) => {
  return request({
    url: '/api/role/get/list',
    method: 'get',
    params
  })
}
// 删除角色
export const delRole = (list) => {
  return request({
    url: `/api/role/del/info?${getIdsStr(list)}`,
    method: 'get'
  })
}
// 新增更新接口
export const projectAdd = (data) => {
  if (data.id) {
    return request({
      url: '/api/project/update/info',
      method: 'post',
      data
    })
  }
  return request({
    url: '/api/project/add/info',
    method: 'post',
    data
  })
}
// 获取项目列表
export const projectList = (params) => {
  return request({
    url: '/api/project/get/list',
    method: 'get',
    params
  })
}
// 获取项目详情
export const getProjectInfo = params => {
  return request({
    url: '/api/project/get/info',
    method: 'get',
    params
  })
}
// 删除项目
export const delProjects = list => {
  return request({
    url: '/api/project/del/info?' + getIdsStr(list),
    method: 'get'
  })
}
// 创建 修改 资源
export const createSource = data => {
  if (data.id) {
    return request({
      url: '/api/res/update/info',
      method: 'post',
      data
    })
  }
  return request({
    url: '/api/res/add/info',
    method: 'post',
    data
  })
}
// 资源详情
export const getSourceInfo = (id) => {
  return request({
    url: `/api/res/get/info?id=${id}`,
    method: 'get'
  })
}
// 资源列表
export const getSourceList = (params) => {
  return request({
    url: `/api/res/get/list`,
    method: 'get',
    params
  })
}
// 获取当前资源节点下的资源树
export const getNodeTree = (parentId) => {
  return request({
    url: `/api/res/get/resTree?parentId=${parentId}`,
    method: 'get'
  })
}
// 获取所有树信息
export const getTree = () => {
  return request({
    url: `/api/res/get/resTree?parentId=0`,
    method: 'get'
  })
}
