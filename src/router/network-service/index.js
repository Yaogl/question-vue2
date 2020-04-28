const routers = [{
  path: '/network-service/vpc-network-list',
  component: () => import('@/views/network-service/vpc-network/list'),
  meta: {
    title: 'VPC子网'
  }
}, {
  path: '/network-service/vpc-network-create',
  component: () => import('@/views/network-service/vpc-network/create'),
  meta: {
    title: '创建VPC子网'
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
}]

export default routers
