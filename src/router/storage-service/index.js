const routers = [{
  path: '/storage-service/block-storage-list',
  component: () => import('@/views/storage-service/block-storage/list'),
  meta: {
    title: '块存储'
  }
}, {
  path: '/storage-service/block-storage-create',
  component: () => import('@/views/storage-service/block-storage/create'),
  meta: {
    title: '块存储'
  }
}, {
  path: '/storage-service/snapshot-list',
  component: () => import('@/views/storage-service/snapshot/list'),
  meta: {
    title: '快照'
  }
}, {
  path: '/storage-service/object-storage-list',
  component: () => import('@/views/storage-service/object-storage/list'),
  meta: {
    title: '对象存储'
  }
}, {
  path: '/storage-service/object-storage-info',
  component: () => import('@/views/storage-service/object-storage/info'),
  meta: {
    title: '对象存储'
  }
}, {
  path: '/storage-service/file-storage-list',
  component: () => import('@/views/storage-service/file-storage/list'),
  meta: {
    title: '文件存储'
  }
}]

export default routers
