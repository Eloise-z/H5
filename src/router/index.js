import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */"../views/Login")
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "index" */"../components/Sidebar"),
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import(/* webpackChunkName: "index" */"../views/Home")
            },
            {
                path: '/user-list',
                component: () => import(/* webpackChunkName: "user" */ "../views/user/UserList")
            }
        ]
    },
    {
        path: '*',
        component: () => import(/* webpackChunkName: "index" */ '../views/404')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 去 personal 中的页面时要判断是否登录
router.beforeEach((to, from, next) => {
    const personal = ['/index'];
    // true 表示需要检查是否登录
    if (personal.includes(to.fullPath)) {
        // 从session中获取用户信息
        const userInfo = sessionStorage.getItem('EloiseUserLoginSession');
        // 有数据，说明登录了的
        if (userInfo) {
            next()
        } else {
            Vue.prototype.$message.warning('登录后才能访问该页面！')
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

export default router
