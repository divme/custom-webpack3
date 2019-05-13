import Home from 'pages/page/home.vue'

import Echart from  'pages/page/echartDemo.vue'
import VeLine from  'pages/page/vechartLine.vue'
import VeScatter from  'pages/page/vechartScatter.vue'
import VeMap from  'pages/page/vechartMap.vue'

import VueProp from 'pages/vue/thethreeattrs/sonprop.vue'
import VuePropFather from 'pages/vue/thethreeattrs/propfather.vue'
import VueStore from 'pages/vue/store.vue'
import VueBasic from 'pages/vue/basic.vue'

import Finance from  'pages/cockpit/finance.vue'
import Performance from  'pages/cockpit/performance.vue'
import Performance2 from  'pages/cockpit/performance2.vue'


export default [
    { path:'/', component: Home, children:[
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

    { path:'/vuebasic', component: VueBasic},
    { path:'/vueprop', component: VueProp},
    { path:'/vuepropfather', component: VuePropFather},
    { path:'/vuestore', component: VueStore},


    { path:'/finance', component: Finance},
    { path:'/performance', component: Performance},
    { path:'/performance2', component: Performance2}
]