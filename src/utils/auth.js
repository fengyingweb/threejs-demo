export default {
  checkLogin (router) {
    let isLogin = true
    router.beforeEach((to, from, next) => {
      console.log(to)
      console.log(from)
      if (to.matched.some(item => item.meta.requireAuth)) {
        if (isLogin) {
          next()
        } else {
          window.location.href = 'login.html'
        }
      } else {
        next()
      }
    })
  }
}