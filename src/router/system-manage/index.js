const routers = [{
  path: '/system-manage/index',
  component: () => import('@/views/system-manage/index'),
  meta: {
    title: '测试页面'
  }
}, {
  path: '/system-manage/system-manage-module',
  component: () => import('@/views/system-manage/module-manage/index'),
  meta: {
    title: '模块管理'
  }
}, {
  path: '/system-manage/system-manage-user',
  component: () => import('@/views/system-manage/user/index'),
  meta: {
    title: '用户管理'
  }
}, {
  path: '/system-manage/system-manage-project',
  component: () => import('@/views/system-manage/project-manage/index'),
  meta: {
    title: '项目管理'
  }
}]

export default routers
