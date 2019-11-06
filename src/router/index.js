import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const modules = require.context('./modules', false, /\.js$/)
let routeArr = []
modules.keys().forEach((key) => {
    const cur = modules(key)
    routeArr = routeArr.concat(cur.default)
})

const routes = [
    {
        path: '/',
        component: () => import('@/home.vue')
    },
    {
        path: '/404',
        component: () => import('@/views/errorPage/404.vue')
    },
    {
        path: '*',
        redirect: '/404'
    },
    ...routeArr
]


const router = new VueRouter({
    // mode: "history",
    routes
})


// 路由级别权限控制
router.beforeEach((to, from, next) => {

})
router.afterEach(() => {
    console.log('router.afterEach', 'dondsdse')
})

export default router
