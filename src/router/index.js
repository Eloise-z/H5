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
            },
            {
                path: '/user-add',
                component: () => import(/* webpackChunkName: "user" */ "../views/user/AddUser")
            },
            {
                path: '/user-update',
                component: () => import(/* webpackChunkName: "user" */ "../views/user/ModifyUser")
            },
            {
                path: '/user-report',
                component: () => import(/* webpackChunkName: "user" */ "../views/user/UserReport")
            },
            {
                path: '/news-list',
                component: () => import(/* webpackChunkName: "news" */ "../views/news/NewsList")
            },
            {
                path: '/news-add',
                component: () => import(/* webpackChunkName: "news" */ "../views/news/AddNews")
            },
            {
                path: '/news-update',
                component: () => import(/* webpackChunkName: "news" */ "../views/news/ModifyNews")
            },
            {
                path: '/goods-list',
                component: () => import(/* webpackChunkName: "goods" */ "../views/goods/GoodList")
            },
            {
                path: '/goods-update',
                component: () => import(/* webpackChunkName: "goods" */ "../views/goods/ModifyGoods")
            },
            {
                path: '/goods-add',
                component: () => import(/* webpackChunkName: "goods" */ "../views/goods/AddGoods")
            },
            {
                path: '/order-list',
                component: () => import(/* webpackChunkName: "goods" */ "../views/order/OrderList")
            },
            {
                path: '/order-detail',
                component: () => import(/* webpackChunkName: "goods" */ "../views/order/OrderDetail")
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

router.beforeEach((to, from, next) => {
    if (to.fullPath !== '/login') {
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
