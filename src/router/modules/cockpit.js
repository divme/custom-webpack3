export default [
    {
        path:'/container',
        component: () => import('@/views/cockpit/container.vue'),
        children:[

        ]

    },
    {
        path:'/finance',
        component: () => import('@/views/cockpit/finance.vue')
    },
    {
        path:'/performance',
        component: () => import('@/views/cockpit/finance.vue')
    },
    {
        path:'/performance2',
        component: () => import('@/views/cockpit/performance2.vue')
    },
    {
        path:'/timedata',
        component: () => import('@/views/cockpit/timeData.vue')
    },
    {
        path:'/ranking',
        component: () => import('@/views/cockpit/ranking.vue')
    },
    {
        path:'/map',
        component: () => import('@/views/cockpit/mapDemo.vue')
    }
]
