import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router.js'
Vue.use(ElementUI)

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 获取token值
  let mytoken = localStorage.getItem('itcast_manager_35_Token')
  // 判断
  // console.log(to)
  // console.log(from)
  // console.log(next)
  if (mytoken || to.path === '/login') {
    next()
  } else {
    // 重定向
    next({ path: '/login' })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
