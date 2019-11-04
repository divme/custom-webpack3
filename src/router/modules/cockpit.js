import Container from '@/views/cockpit/container.vue'

import Finance from '@/views/cockpit/finance.vue'
import Performance from '@/views/cockpit/performance.vue'
import Performance2 from '@/views/cockpit/performance2.vue'
import TimeData from '@/views/cockpit/timeData.vue'
import Ranking from '@/views/cockpit/ranking.vue'
import Map from  '@/views/cockpit/mapDemo.vue'

export default [
    {
        path:'/container',
        component: Container,
        children:[

        ]

    },
    { path:'/finance', component: Finance},
    { path:'/performance', component: Performance},
    { path:'/performance2', component: Performance2},
    { path:'/timedata', component: TimeData},
    { path:'/ranking', component: Ranking},
    { path:'/map', component: Map}
]