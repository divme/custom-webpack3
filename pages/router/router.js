import Home from 'pages/page/home.vue'
import Add from  'pages/page/add.vue'
import Echart from  'pages/page/echartDemo.vue'
import VeLine from  'pages/page/vechartLine.vue'
import VeScatter from  'pages/page/vechartScatter.vue'
import VeMap from  'pages/page/vechartMap.vue'

import Finance from  'pages/cockpit/finance.vue'
import Performance from  'pages/cockpit/performance.vue'
import Performance2 from  'pages/cockpit/performance2.vue'

export default [
    { path:'/', component: Home},
    { path:'/add', component: Add},
    { path:'/echart', component: Echart},
    { path:'/veline', component: VeLine},
    { path:'/vescatter', component: VeScatter},
    { path:'/vemap', component: VeMap},

    { path:'/finance', component: Finance},
    { path:'/performance', component: Performance},
    { path:'/performance2', component: Performance2}
]