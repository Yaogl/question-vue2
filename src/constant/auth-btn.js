// 维护系统所有涉及权限的按钮
export default {
  // 云主机的列表
  INSTANCE_REFRESH_BTN: 'instance-refresh-btn', // 云主机刷新
  INSTANCE_CREATE_BTN: 'instance-create-btn', // 云主机的创建
  INSTANCE_START_BTN: 'instance-start-btn', // 云主机开机
  INSTANCE_STOP_BTN: 'instance-stop-btn', // 云主机关机
  INSTANCE_RESTART_BTN: 'instance-restart-btn', // 云主机重启
  INSTANCE_TAGS_BTN: 'instance-tags-btn', // 云主机标签
  INSTANCE_VNC_BTN: 'instance-vnc-btn', // 云主机连接vnc
  INSTANCE_EXPORT_BTN: 'instance-export-btn', // 云主机导出
  // 秘钥列表
  SSHKEY_REFRESH_BTN: 'sshkey-refresh-btn', // 秘钥刷新
  SSHKEY_CREATE_BTN: 'sshkey-create-btn', // 秘钥的创建
  SSHKEY_IMPORT_BTN: 'sshkey-import-btn', // 导入密钥对
  SSHKEY_DELETE_BTN: 'sshkey-delete-btn', // 秘钥删除
  SSHKEY_EXPORT_BTN: 'sshkey-export-btn', // 秘钥导出
  // 镜像列表
  IMAGE_REFRESH_BTN: 'image-refresh-btn', // 镜像刷新
  IMAGE_EXPORT_BTN: 'image-export-btn', // 镜像导出
  IMAGE_PRIVATE_DELETE_BTN: 'image-private-delete-btn', // 私有镜像删除
  IMAGE_PRIVATE_SHARE_BTN: 'image-private-share-btn', // 私有镜像共享
  IMAGE_PRIVATE_COPY_BTN: 'image-private-copy-btn', // 私有镜像复制
  // 容灾组列表
  SERVER_GROUP_REFRESH_BTN: 'server-group-refresh-btn', // 容灾组刷新
  SERVER_GROUP_DELETE_BTN: 'server-group-delete-btn', // 容灾组删除
  SERVER_GROUP_CREATE_BTN: 'server-group-create-btn', // 容灾组创建
  SERVER_GROUP_EXPORT_BTN: 'server-group-export-btn', // 容灾组导出
  // VPC网络列表
  NETWORK_REFRESH_BTN: 'network-refresh-btn', // vpc网络刷新
  NETWORK_CREATE_BTN: 'network-create-btn', // vpc网络创建
  NETWORK_DELETE_BTN: 'network-delete-btn', // vpc网络删除
  NETWORK_EXPORT_BTN: 'network-export-btn', // vpc网络导出
  NETWORK_TO_INFO_BTN: 'network-to-info-btn', // vpc网络详情

  SUB_NETWORK_CREATE_BTN: 'sub-network-create-btn', // 子网创建
  SUB_NETWORK_EDIT_BTN: 'sub-network-edit-btn', // 子网修改
  SUB_NETWORK_DELETE_BTN: 'sub-network-delete-btn', // 子网删除
  SUB_NETWORK_INFO_BTN: 'sub-network-info-btn', // 查看子网详情
  SUB_NETWORK_ROUTE_CREATE_BTN: 'sub-network-route-create-btn', // 路由创建
  SUB_NETWORK_IP_CREATE_BTN: 'sub-network-ip-create-btn', // 虚拟ip创建
  // 负载均衡
  LOAD_BALANCING_REFRESH_BTN: 'load-balancing-refresh-btn', // 负载均衡刷新
  LOAD_BALANCING_CREATE_BTN: 'load-balancing-create-btn', // 负载均衡创建
  LOAD_BALANCING_DELETE_BTN: 'load-balancing-delete-btn', // 负载均衡删除
  LOAD_BALANCING_EXPORT_BTN: 'load-balancing-export-btn', // 负载均衡导出

  CERTIFICATE_REFRESH_BTN: 'certificate-refresh-btn', // 证书刷新
  CERTIFICATE_CREATE_BTN: 'certificate-create-btn', // 证书创建
  CERTIFICATE_DELETE_BTN: 'certificate-delete-btn', // 证书删除
  CERTIFICATE_EXPORT_BTN: 'certificate-export-btn', // 证书导出

  ADDRESS_POOL_REFRESH_BTN: 'address-pool-refresh-btn', // 地址池刷新
  ADDRESS_POOL_CREATE_BTN: 'address-pool-create-btn', // 地址池创建
  ADDRESS_POOL_DELETE_BTN: 'address-pool-delete-btn', // 地址池删除
  ADDRESS_POOL_EXPORT_BTN: 'address-pool-export-btn', // 地址池导出
  // VPN服务
  VPN_GATEWAY_REFRESH_BTN: 'vpn-gateway-refresh-btn', // vpn网关刷新
  VPN_GATEWAY_CREATE_BTN: 'vpn-gateway-create-btn', // vpn网关创建
  VPN_GATEWAY_DELETE_BTN: 'vpn-gateway-delete-btn', // vpn网关删除
  VPN_GATEWAY_EXPORT_BTN: 'vpn-gateway-export-btn', // vpn网关导出

  VPN_CONNECT_REFRESH_BTN: 'vpn-connect-refresh-btn', // vpn连接刷新
  VPN_CONNECT_CREATE_BTN: 'vpn-connect-create-btn', // vpn连接创建
  VPN_CONNECT_DELETE_BTN: 'vpn-connect-delete-btn', // vpn连接删除
  VPN_CONNECT_EXPORT_BTN: 'vpn-connect-export-btn', // vpn连接导出
  // 块存储
  VOLUME_REFRESH_BTN: 'volume-refresh-btn', // 块存储刷新
  VOLUME_CREATE_BTN: 'volume-create-btn', // 块存储创建
  VOLUME_DELETE_BTN: 'volume-delete-btn', // 块存储删除
  VOLUME_EXPORT_BTN: 'volume-export-btn', // 块存储导出
  VOLUME_INFO_BTN: 'volume-info-btn', // 块存储详情
  VOLUME_MOUNT_BTN: 'volume-mount-btn', // 块存储挂载
  // 快照 snapshot
  SNAPSHOT_REFRESH_BTN: 'snapshot-refresh-btn', // 快照刷新
  SNAPSHOT_DELETE_BTN: 'snapshot-delete-btn', // 快照删除
  // 对象存储 object storage
  OBJECT_STORAGE_REFRESH_BTN: 'object-storage-refresh-btn', // 刷新
  OBJECT_STORAGE_CREATE_BTN: 'object-storage-create-btn', // 创建
  OBJECT_STORAGE_DELETE_BTN: 'object-storage-delete-btn', // 删除
  // 文件存储 file storage
  FILE_STORAGE_REFRESH_BTN: 'file-storage-refresh-btn', // 刷新
  FILE_STORAGE_CREATE_BTN: 'file-storage-create-btn', // 创建
  FILE_STORAGE_DELETE_BTN: 'file-storage-delete-btn', // 删除
  // 防火墙 firewall
  FIREWALL_REFRESH_BTN: 'firewall-refresh-btn', // 刷新
  FIREWALL_CREATE_BTN: 'firewall-create-btn', // 创建
  FIREWALL_EDIT_BTN: 'firewall-edit-btn', // 修改
  FIREWALL_DELETE_BTN: 'firewall-delete-btn', // 删除
  // 安全组 security-group
  SECURITY_GROUP_REFRESH_BTN: 'security-group-refresh-btn', // 刷新
  SECURITY_GROUP_CREATE_BTN: 'security-group-create-btn', // 创建
  SECURITY_GROUP_EDIT_BTN: 'security-group-edit-btn', // 修改
  SECURITY_GROUP_DELETE_BTN: 'security-group-delete-btn', // 删除
  // 角色管理 user-manage
  USER_MANAGE_REFRESH_BTN: 'user-manage-refresh-btn', // 刷新
  USER_MANAGE_CREATE_BTN: 'user-manage-create-btn', // 创建
  USER_MANAGE_EDIT_BTN: 'user-manage-edit-btn', // 修改
  USER_MANAGE_DELETE_BTN: 'user-manage-delete-btn', // 删除
  USER_MANAGE_RESOURCE_BTN: 'user-manage-resource-btn', // 分配资源
  USER_MANAGE_USER_BTN: 'user-manage-user-btn', // 分配用户
  // 项目管理 project-manage
  PROJECT_MANAGE_REFRESH_BTN: 'project-manage-refresh-btn', // 刷新
  PROJECT_MANAGE_CREATE_BTN: 'project-manage-create-btn', // 创建
  PROJECT_MANAGE_EDIT_BTN: 'project-manage-edit-btn', // 修改
  PROJECT_MANAGE_DELETE_BTN: 'project-manage-delete-btn', // 删除
  PROJECT_MANAGE_USER_BTN: 'project-manage-user-btn', // 分配用户
  // 模块管理 module-manage
  MODULE_MANAGE_CREATE_BTN: 'module-manage-create-btn', // 创建
  MODULE_MANAGE_EDIT_BTN: 'module-manage-edit-btn', // 修改
  MODULE_MANAGE_DELETE_BTN: 'module-manage-delete-btn', // 删除
}
