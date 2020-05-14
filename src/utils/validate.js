// 是否手机号码或者固话
export const validatePhoneTwo = (context) => (rule, value, callback) => {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
      callback()
    }
  }
}
// 验证是否为整数
export const isInteger = (context) => (rule, value, callback) => {
  if (!Number(value)) {
    callback(new Error('请输入正整数'))
  } else {
    const re = /^[0-9]*[1-9][0-9]*$/
    const rsCheck = re.test(value)
    if (!rsCheck) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
}
