import Home from 'pages/page/home.vue'
import Echart from  'pages/page/echartDemo.vue'
import VeLine from  'pages/page/vechartLine.vue'
import VeScatter from  'pages/page/vechartScatter.vue'
import VeMap from  'pages/page/vechartMap.vue'

import Vueprop from 'pages/vue/thethreeattrs/prop.vue'
import Vuestore from 'pages/vue/store.vue'
import Vuebasic from 'pages/vue/basic.vue'

import Finance from  'pages/cockpit/finance.vue'
import Performance from  'pages/cockpit/performance.vue'
import Performance2 from  'pages/cockpit/performance2.vue'



export default [
    { path:'/', component: Home,children:[
            { path:'/echart', component: Echart},
            { path:'/veline', component: VeLine},
            { path:'/vescatter', component: VeScatter},
            { path:'/vemap', component: VeMap}
        ]
    },

    // { path:'/echart', component: Echart},
    // { path:'/veline', component: VeLine},
    // { path:'/vescatter', component: VeScatter},
    // { path:'/vemap', component: VeMap},

    { path:'/vuebasic', component: Vuebasic},
    { path:'/vueprop', component: Vueprop},
    { path:'/vuestore', component: Vuestore},


    { path:'/finance', component: Finance},
    { path:'/performance', component: Performance},
    { path:'/performance2', component: Performance2}
]