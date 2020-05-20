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
// 获取项目配额
export const getProjectQuota = (id) => {
  return request({
    url: `/api/project/get/quota?projectUuid=${id}`,
    method: 'get'
  })
}
// 更新项目配额
export const updateQuota = (data) => {
  return request({
    url: `/api/project/update/quota`,
    method: 'post',
    data
  })
}
// 获取项目详情
export const getProjectInfo = id => {
  return request({
    url: '/api/project/get/info?id=' + id,
    method: 'get'
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
export const createResource = data => {
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
// 删除资源
export const delResource = (list) => {
  return request({
    url: '/api/res/del/info?' + getIdsStr(list),
    method: 'get'
  })
}
// 资源详情
export const getResourceInfo = (id) => {
  return request({
    url: `/api/res/get/info?id=${id}`,
    method: 'get'
  })
}
// 查询项目中所有成员
export const getResourceUser = (params) => {
  return request({
    url: '/api/project/get/user',
    method: 'get',
    params
  })
}
// 更新项目中人员 更新逻辑为删除以前新增参数中所有的用户
export const setResourceUser = (data) => {
  return request({
    url: '/api/project/update/user',
    method: 'post',
    data
  })
}
// 查询所有人员 增加分页。如不需要，则将pageSize传大值即可
export const getAllUser = (params) => {
  return request({
    url: '/api/user/get/list',
    method: 'get',
    params
  })
}
// 右侧资源列表
export const getResourceList = (params) => {
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
// 获得角色下关联的资源
export const getRoleResource = (id) => {
  return request({
    url: `/api/role/get/resource?roleId=${id}`,
    method: 'get'
  })
}
// 角色下分配资源
export const setRoleResource = (roleId, list) => {
  if (!list.length) { // 清空角色下资源
    return request({
      url: `/api/role/update/resource?roleId=${roleId}&ids=`,
      method: 'get'
    })
  }
  return request({
    url: `/api/role/update/resource?roleId=${roleId}${getIdsStr(list, '&')}`,
    method: 'get'
  })
}
// 获取角色下用户列表
export const getRoleUser = (roleId) => {
  return request({
    url: '/api/role/get/user?roleId=' + roleId,
    method: 'get'
  })
}
// 角色增加用户
export const setRoleUser = (roleId, list) => {
  if (!list.length) { // 清空角色下用户
    return request({
      url: `/api/role/assign/user?roleId=${roleId}&ids=`,
      method: 'get'
    })
  }
  return request({
    url: `/api/role/assign/user?roleId=${roleId}${getIdsStr(list, '&')}`,
    method: 'get'
  })
}
// 获取用户权限
export const getUserAuth = (name) => {
  return request({
    url: `/api/res/get/userResTree?uname=${name}`,
    method: 'get'
  })
}
