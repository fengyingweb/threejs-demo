import 'babel-polyfill' // 解决ie9, 及高级浏览器低版本不能使用es6语法问题
// import 'amfe-flexible'
import '@/styles/base.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/views/demo/App.vue'
import routes from '@/views/demo/router/router'
import store from '@/views/demo/store/store'
import lang from '@/lang/index'
import auth from '@/utils/auth'

Vue.use(VueRouter);
const router = new VueRouter({
  routes
})

auth.checkLogin(router)
const i18n = lang.initLanguage()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
