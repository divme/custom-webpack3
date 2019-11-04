import VueBasic from '@/views/vue/basic.vue'
import VueSlotFather from '@/views/vue/thethreeattrs/slotFather.vue'
import VuePropFather from '@/views/vue/thethreeattrs/propFather.vue'
import VueEventFather from '@/views/vue/thethreeattrs/eventFather.vue'
import VueStore from '@/views/vue/store.vue'


export default [
    {
        path:'/vuebasic',
        component: VueBasic
    },
    {
        path:'/vueslotfather',
        component: VueSlotFather
    },
    {
        path:'/vuepropfather',
        component: VuePropFather
    },
    {
        path:'/vueeventfather',
        component: VueEventFather
    },
    {
        path:'/vuestore',
        component: VueStore
    }
]