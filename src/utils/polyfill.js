
(() => {
  // 处理在IE9下origin不存在的问题
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  }
})()
