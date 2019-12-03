export default [
    {   path:'/echart',
        component: () => import('@/views/vechart/echartDemo.vue')
    },
    {
        path:'/useechart',
        component: () => import('@/views/vechart/echartUse.vue')
    },
    {
        path:'/veline',
        component: () => import('@/views/vechart/vechartLine.vue')
    },
    {
        path:'/vescatter',
        component: () => import('@/views/vechart/vechartScatter.vue')
    },
    {
        path:'/vemap',
        component: () => import('@/views/vechart/vechartMap.vue')
    }
]
