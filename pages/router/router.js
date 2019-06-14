import Home from 'pages/home.vue'

import Echart from 'pages/vechart/echartDemo.vue'
import UseEchart from 'pages/vechart/echartUse.vue'
import VeLine from 'pages/vechart/vechartLine.vue'
import VeScatter from 'pages/vechart/vechartScatter.vue'
import VeMap from 'pages/vechart/vechartMap.vue'

import VueBasic from 'pages/vue/basic.vue'
import VueSlotFather from 'pages/vue/thethreeattrs/slotFather.vue'
import VuePropFather from 'pages/vue/thethreeattrs/propFather.vue'
import VueEventFather from 'pages/vue/thethreeattrs/eventFather.vue'
import VueStore from 'pages/vue/store.vue'


import Finance from  'pages/cockpit/finance.vue'
import Container from  'pages/cockpit/container.vue'
import Performance from  'pages/cockpit/performance.vue'
import Performance2 from  'pages/cockpit/performance2.vue'
import TimeData from  'pages/cockpit/timeData.vue'
import Ranking from  'pages/cockpit/ranking.vue'
import Map from  'pages/cockpit/mapDemo.vue'


export default [
    { path:'/',
        component: Home,
        redirect: 'vescatter',
        children:[
            {   path:'/echart',
                component: Echart
            },
            { path:'/useechart', component: UseEchart},
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
    { path:'/vueslotfather', component: VueSlotFather},
    { path:'/vuepropfather', component: VuePropFather},
    { path:'/vueeventfather', component: VueEventFather},
    { path:'/vuestore', component: VueStore},


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