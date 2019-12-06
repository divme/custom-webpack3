import basic from '@/views/vue/basic.vue'

export default [
    {
        path:'/vuebasic',
        component: basic
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
