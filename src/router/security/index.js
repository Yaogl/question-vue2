const routers = [{
  path: '/security/security-group-list',
  component: () => import('@/views/security/security-group/list'),
  meta: {
    title: '安全组'
  }
}, {
  path: '/security/firewall-list',
  component: () => import('@/views/security/firewall/list'),
  meta: {
    title: '防火墙'
  }
}]

export default routers
