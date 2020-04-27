// 云主机接口
import request from '../utils/request'

export const getInstanceList = data => {
  return request({
    url: '/api/bcp/v1/instance/list',
    method: 'get'
  })
}
