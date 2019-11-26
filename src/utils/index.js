import Cookies from 'js-cookie'

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/gi, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 关闭当前窗口
 */
export const closeWindow = (url) => {
  if (navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
    window.location.href = url
    window.close()
  } else {
    window.opener = null
    window.open('', '_self')
    window.close()
  }
}

/**
 * 生成UUID
 * @returns {string}
 */
export const uuid = (len = 16, radix = 16) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    var r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/**
 * 获取主域
 * @param weburl
 * @returns {string}
 */
export const getDomain = (host = document.domain) => {
  let hostExts = ['.com', '.cn', '.net', '.cc', '.sh', '.org']
  let ext = []
  let reExt
  let exist = false
  for (var i = 0; i < hostExts.length; i++) {
    if (host.indexOf(hostExts[i]) !== -1) {
      ext[ext.length] = hostExts[i]
      reExt = new RegExp('\\' + hostExts[i])
      host = host.replace(reExt, '{' + (ext.length - 1) + '}')
      exist = true
    } else {
      break
    }
  }
  if (!exist) {
    return host
  }
  var hostarray = host.split('.')
  host = hostarray[hostarray.length - 1]
  for (let i = 0; i < ext.length; i++) {
    reExt = new RegExp('\\{' + i + '\\}')
    host = host.replace(reExt, ext[i])
  }
  return host
}

/**
 * 清除所有cookie
 */
export const clearCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=\\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      Cookies.remove(keys[i], {
        expires: new Date(0).toUTCString()
      })
      Cookies.remove(keys[i], {
        expires: new Date(0).toUTCString(),
        domain: getDomain()
      })
    }
  }
}

/**
 * 设置cookie
 * @param name 键
 * @param value 值
 * @param domain 域
 */
export const setCookie = (name, value, params = {}) => {
  Cookies.set(name, value, {domain: params.domain || window.location.hostname, expires: 7})
}
/**
 * 获取URL参数
 * @param name
 * @returns {null}
 */
export const getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}
