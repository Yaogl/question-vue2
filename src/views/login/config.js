export const getLoginRules = (context) => {
  return {
    username: [
      { required: true, message: '请输入用户名', trigger: 'change' },
      { validator: validateUserName(context), trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'change' },
      // { validator: validatePassword(context), trigger: 'blur' }
    ]
  }
}

export const getRegisterRules = (context) => {
  return {
    username: [
      { required: true, message: '请输入用户名', trigger: 'change' },
      { validator: validateUserName(context), trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'change' },
      { validator: validatePassword(context), trigger: 'blur' }
    ],
    realname: [
      { required: true, message: '请输入真实姓名', trigger: 'change' }
    ]
  }
}
const validateUserName = (context) => (rule, value, callback) => {
  let reg = /^[a-zA-z][a-zA-Z0-9_-]{3,15}$/
  if (!reg.test(value)) {
    return callback(new Error('只能输入4-16个以字母开头的字符'))
  } else {
    return callback()
  }
}
const validatePassword = (context) => (rule, value, callback) => {
  let reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入6-20包含数字跟字母的字符'))
  } else {
    return callback()
  }
}
const againPassword = (context) => (rule, value, callback) => {
  let reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入6-20包含数字跟字母的字符'))
  } else {
    if (value !== context.formData.userPwd) {
      return callback(new Error('密码输入不一致'))
    } else {
      return callback()
    }
  }
}
