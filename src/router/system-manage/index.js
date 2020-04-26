const routers = [{
  path: '/system-manage/system-manage-module',
  component: () => import('@/views/system-manage/module-manage/index'),
  meta: {
    title: '模块管理'
  }
}]

export default routers
