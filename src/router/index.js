import Home from '@/home.vue'

const modules = require.context('./modules', false, /\.js$/)
let routeArr = []
modules.keys().forEach((key) => {
    const cur = modules(key)
    routeArr = routeArr.concat(cur.default)
})

export default [
    {
        path: '/',
        component: Home
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