// 全站路由列表
export default [
  {
    icon: '&#xe62d;',
    index: '/dashboard',
    title: '系统首页'
  },
  {
    icon: '&#xe621;',
    index: '1',
    title: '计算服务',
    children: [
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
    icon: '&#xe6e7;',
    index: '2',
    title: '网络服务',
    children: [
      {
        index: '/network-service/vpc-network-list',
        title: 'VPC网络'
      },
      {
        index: '/network-service/load-balancing-index',
        title: '负载均衡'
      },
      {
        index: '/network-service/vpn-service-index',
        title: 'vpn服务'
      }
    ]
  },
  {
    icon: '&#xe745;',
    index: '3',
    title: '存储服务',
    children: [
      {
        index: '/storage-service/block-storage-list',
        title: '块存储'
      },
      {
        index: '/storage-service/object-storage-list',
        title: '对象存储'
      },
      {
        index: '/storage-service/file-storage-list',
        title: '文件存储'
      },
      {
        index: '/storage-service/snapshot-list',
        title: '快照'
      }
    ]
  },
  {
    icon: '&#xe623;',
    index: '4',
    title: '安全',
    children: [
      {
        index: '/security/firewall-list',
        title: '防火墙'
      },
      {
        index: '/security/security-group-list',
        title: '安全组'
      }
    ]
  },
  {
    icon: '&#xe60a;',
    index: '5',
    title: '系统管理',
    children: [
      {
        index: '/system-manage/system-manage-module',
        title: '模块管理'
      },
      {
        index: '/system-manage/system-manage-user',
        title: '角色管理'
      },
      {
        index: '/system-manage/system-manage-project',
        title: '项目管理'
      }
    ]
  }
]
