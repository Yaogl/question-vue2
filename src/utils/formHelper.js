// 将true/false映射为1/0或反之
export const radioHandle = (value) => {
  if (typeof value === 'boolean') {
    return Number(value)
  } else if (typeof value === 'number') {
    return Boolean(value)
  }

  return null
}

export const handleRadio = (fields) => (formdata) => {
  return fields.forEach((field) => {
    formdata[field] = radioHandle(formdata[field])
  })
}

export const createFormDataFormatter = (formatter) => (rawFormData) => {
  let formdata = JSON.parse(JSON.stringify(rawFormData))

  formatter(formdata)
  Object.keys(formdata).forEach(field => {
    if (Object.prototype.toString.call(formdata[field]) === '[object Array]' && field !== 'deptsLevel' && field !== 'deptStr') {
      formdata[field] = formdata[field].join()
    }
    if (typeof formdata[field] === 'undefined') {
      delete formdata[field]
    }
    if (typeof formdata[field] === 'object') {
      formdata[field] = JSON.stringify(formdata[field])
    }

    if (typeof formdata[field] === 'number' && isNaN(formdata[field])) {
      formdata[field] = void (0)
    }
  })
  return formdata
}

export const resetWith = (target, source) => {
  Object.keys(target).forEach(key => {
    target[key] = source[key]
  })
}

export const handleQueryFields = (query) => {
  let ret = {}
  Object.keys(query).forEach(key => {
    let val = query[key]
    if (typeof val === 'boolean' || val) {
      ret[key] = val
    }
    if (Array.isArray(val)) {
      ret[key] = val.join()
    }
    if (typeof val === 'number' && !isNaN(val)) {
      ret[key] = val
    }
  })
  return ret
}

const ccReg = /([\u4e00-\u9fa5]+)/g

export function getTextLen (text) {
  if (!text) {
    return 0
  }

  let len = text.length
  let ccLen = (text.match(ccReg) || []).join('').length

  return len - ccLen + ccLen * 2
}

export const isStr2Number = str => str !== '' && !isNaN(Number(str))

export const isNumber = num => {
  const type = Object.prototype.toString.call(num).slice(8, -1).toLowerCase()
  if (type === 'string') {
    if (!num.trim()) return false
  } else if (type !== 'number') {
    return false
  }
  return (num - num + 1) >= 0
}

export const isStr2Boolean = str => typeof str === 'boolean' || str === 'true' || str === 'false'

export const getUrlQuery = (name) => {
  const href = location.href
  const search = href.split('?')[1]
  if (!search) {
    return
  }
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = search.match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}
