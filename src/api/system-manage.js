// 系统相关接口
import request from '../utils/request'
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
