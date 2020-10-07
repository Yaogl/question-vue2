import request from '../utils/request'

export const getList = params => {
  return request({
    url: '/api/question/list',
    method: 'get',
    params
  })
}
export const questionAdd = (data, id) => {
  if (id) {
    return request({
      url: '/api/question/update',
      method: 'post',
      data,
      params: {
        id
      }
    })
  }
  return request({
    url: '/api/question/add',
    method: 'post',
    data
  })
}
export const getDetail = (id) => {
  return request({
    url: '/api/question/detail',
    method: 'get',
    params: {
      id
    }
  })
}
export const delQuestion = id => {
  return request({
    url: '/api/question/del',
    method: 'get',
    params: {
      id
    }
  })
}