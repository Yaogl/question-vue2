const routers = [{
  path: '/compute-service/cloud-host-list',
  component: () => import('@/views/compute-service/cloud-host/list'),
  meta: {
    title: '云主机'
  }
}, {
  path: '/compute-service/cloud-host-info',
  component: () => import('@/views/compute-service/cloud-host/info'),
  meta: {
    title: '云主机'
  }
}, {
  path: '/compute-service/cloud-host-create',
  component: () => import('@/views/compute-service/cloud-host/create'),
  meta: {
    title: '云主机'
  }
}, {
  path: '/compute-service/mirror-image-list',
  component: () => import('@/views/compute-service/mirror-image/list'),
  meta: {
    title: '镜像'
  }
}, {
  path: '/compute-service/secret-key-list',
  component: () => import('@/views/compute-service/secret-key/list'),
  meta: {
    title: '秘钥'
  }
}, {
  path: '/compute-service/disaster-tolerance-list',
  component: () => import('@/views/compute-service/disaster-tolerance/list'),
  meta: {
    title: '容灾'
  }
}]

export default routers
