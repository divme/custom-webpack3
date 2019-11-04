/**
 * Created by Administrator on 2019/9/13 0013.
 */
import Finance from  'pages/cockpit/finance.vue'
import Container from  'pages/cockpit/container.vue'
import Performance from  'pages/cockpit/performance.vue'
import Performance2 from  'pages/cockpit/performance2.vue'
import TimeData from  'pages/cockpit/timeData.vue'
import Ranking from  'pages/cockpit/ranking.vue'
import Map from  'pages/cockpit/mapDemo.vue'

export default [
    {
        path:'/container',
        component: Container,
        children:[
            { path:'/finance', component: Finance},
            { path:'/performance', component: Performance},
            { path:'/performance2', component: Performance2},
            { path:'/timedata', component: TimeData},
            { path:'/ranking', component: Ranking},
        ]

    },

    { path:'/map', component: Map}
]

