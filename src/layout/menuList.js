// 全站路由列表
export default [
  {
    icon: 'el-icon-lx-home',
    index: '/dashboard',
    title: '系统首页'
  },
  {
    icon: 'el-icon-lx-calendar',
    index: '1',
    title: '计算服务',
    subs: [
      {
        index: '/compute-service/cloud-host-list',
        title: '云主机'
      },
      {
        index: '/compute-service/mirror-image-list',
        title: '镜像'
      },
      {
        index: '/compute-service/secret-key-list',
        title: '秘钥'
      },
      {
        index: '/compute-service/disaster-tolerance-list',
        title: '容灾'
      }
    ]
  },
  {
    icon: 'el-icon-eleme',
    index: '2',
    title: '网络服务',
    subs: [
      {
        index: '/network-service/vpc-network-list',
        title: 'VPC子网'
      }
    ]
  },
  {
    icon: 'el-icon-lx-warn',
    index: '3',
    title: '系统管理',
    subs: [
      {
        index: '/system-manage/system-manage-module',
        title: '模块管理'
      }
    ]
  }
]
