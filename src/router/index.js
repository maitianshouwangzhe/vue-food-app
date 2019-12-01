// 路由器对象模块

import Vue from 'vue'
import VueRoute from 'vue-router'
import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'



Vue.use(VueRoute)

// 构造函数
// 配置所有的路由
export default new VueRoute({
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home,
            // 配置仅仅某些路由显示底部的页脚
            meta: {
            showFooter: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
            showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
            showFooter: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
            showFooter: true
            }
        },
        {
          path: '/login',
          component: Login,
        },
    ]
})
