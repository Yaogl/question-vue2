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
    title: 'VPC子网'
  }
}]

export default routers
