export const moreOperate = [
  { label: '强制关机', value: 1 },
  { label: '重置密码', value: 2 },
  { label: '重置系统', value: 3 },
  { label: '编辑标签', value: 4 },
  { label: '同步状态', value: 5 },
  { label: '关联安全组', value: 6 },
  { label: '续费', value: 7 },
  { label: '加入容灾组', value: 8 },
  { label: '设置删除保护', value: 9 },
  { label: '删除', value: 10 }
]
export const listMoreOperate = [
  { label: '开机', value: 1, componentName: '' },
  { label: '关机', value: 2, componentName: '' },
  { label: '重启', value: 3, componentName: '' },
  { label: '强制重启', value: 4, componentName: '' },
  { label: '重置密码', value: 5, componentName: 'reset-password' },
  { label: '重置系统', value: 6, componentName: 'reset-system' },
  { label: '生成镜像', value: 7, componentName: 'generate-image' },
  { label: '绑定弹性ip', value: 8, componentName: 'bind-ip' },
  { label: '解绑弹性ip', value: 9, componentName: '' },
  { label: '挂载磁盘', value: 10, componentName: 'bind-ip' },
  { label: '卸载磁盘', value: 11, componentName: 'bind-ip' },
  { label: '调整配置', value: 12, componentName: 'adjust-configuration' },
  { label: '更改项目', value: 13, componentName: '' },
  { label: '标记标签', value: 14, componentName: '' },
  { label: '同步状态', value: 15, componentName: '' },
  { label: '关联安全组', value: 16, componentName: '' },
  { label: '续费', value: 17, componentName: '' },
  { label: '绑定秘钥', value: 18, componentName: '' },
  { label: '解绑秘钥', value: 19, componentName: '' },
  { label: '设置删除保护', value: 20, componentName: '' },
  { label: '删除', value: 21, componentName: '' }
]
// 创建云主机规则
export const instanceRules = (context) => {
  return {
    name: [
      { required: true, message: '请输入虚拟机名称', trigger: 'change' },
      { max: 200, message: '长度超出限制，请重新输入', trigger: 'change' }
    ],
    image: [
      { required: true, message: '请选择镜像', trigger: 'change' }
    ],
    flavor: [
      { required: true, message: '请选择虚拟机类型', trigger: 'change' }
    ],
    key_name: [
      { required: true, message: '请选择密钥对', trigger: 'change' }
    ],
    availability_zone: [
      { required: true, message: '请选择区域', trigger: 'change' }
    ],
    network_id: [
      { required: true, message: '请选择网络', trigger: 'change' }
    ],
    againPass: [
      { validator: validatePass(context), trigger: 'blur' }
    ]
  }
}
const validatePass = (context) => (rule, value, callback) => {
  if (context.formData.adminPass !== context.formData.againPass) {
    return callback('两次输入密码不一致')
  } else {
    return callback()  
  }
}
