
export default [
    {
        path:'/vuebasic',
        component: () => import('@/views/vue/basic.vue')
    },
    {
        path:'/vueslotfather',
        component: () => import('@/views/vue/thethreeattrs/slotFather.vue')
    },
    {
        path:'/vuepropfather',
        component: () => import('@/views/vue/thethreeattrs/propFather.vue')
    },
    {
        path:'/vueeventfather',
        component: () => import('@/views/vue/thethreeattrs/eventFather.vue')
    },
    {
        path:'/vuestore',
        component: () => import('@/views/vue/store.vue')
    }
]
