const routers = [{
  path: '/network-service/vpc-network-list',
  component: () => import('@/views/network-service/vpc-network/list'),
  meta: {
    title: 'VPC网络'
  }
}, {
  path: '/network-service/vpc-network-create',
  component: () => import('@/views/network-service/vpc-network/create'),
  meta: {
    title: '创建VPC网络'
  }
}, {
  path: '/network-service/vpc-network-info',
  component: () => import('@/views/network-service/vpc-network/info'),
  meta: {
    title: 'VPC子网详情'
  }
}, {
  path: '/network-service/vpc-network-sub-info',
  component: () => import('@/views/network-service/vpc-network/sub-info'),
  meta: {
    title: '子网详情'
  }
}, {
  path: '/network-service/load-balancing-index',
  component: () => import('@/views/network-service/load-balancing'),
  meta: {
    title: '负载均衡'
  }
}, {
  path: '/network-service/vpn-service-index',
  component: () => import('@/views/network-service/vpn-service'),
  meta: {
    title: 'VPN服务'
  }
}]

export default routers
