// 系统相关接口
import request from '../utils/request'
// 创建角色
export const roleAdd = (data) => {
  return request({
    url: '/api/role/add/info',
    method: 'post',
    data
  })
}
// 修改角色
export const roleUpdate = (data) => {
  return request({
    url: '/api/role/update/info',
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
  let search = []
  list.map(id => {
    search.push(`ids=${id}`)
  })
  return request({
    url: `/api/role/del/info?${search.join('&')}`,
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
export const delProjects = params => {
  return request({
    url: '/api/project/del/info',
    method: 'get',
    params
  })
}
