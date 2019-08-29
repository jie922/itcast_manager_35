// 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/user/users.vue'
import RightList from '@/views/rights/rightList.vue'
import RoleList from '@/views/rights/roleList.vue'
Vue.use(VueRouter)

// 创建路由对象
export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    // 添加登录路由
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    // 添加首页组件路由
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: { name: 'welcome' }, // 重定向
      // 嵌套欢迎页面组件路由
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        // 添加用户列表
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        // 添加权限列表
        {
          name: 'rightList',
          path: 'rightList',
          component: RightList
        },
        // 角色列表
        {
          name: 'roleList',
          path: 'roleList',
          component: RoleList
        }

      ]
    }
  ]
})
