import Echart from '@/views/vechart/echartDemo.vue'
import UseEchart from '@/views/vechart/echartUse.vue'
import VeLine from '@/views/vechart/vechartLine.vue'
import VeScatter from '@/views/vechart/vechartScatter.vue'
import VeMap from '@/views/vechart/vechartMap.vue'

export default [
    {   path:'/echart',
        component: Echart
    },
    {
        path:'/useechart',
        component: UseEchart
    },
    {
        path:'/veline',
        component: VeLine
    },
    {
        path:'/vescatter',
        component: VeScatter
    },
    {
        path:'/vemap',
        component: VeMap
    }
]