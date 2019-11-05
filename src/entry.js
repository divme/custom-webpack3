import Vue from "vue"
import router from './router'
import store from "./store"


import Vcharts from 'v-charts'

// import Entry from 'entry'
// import Home from './Home.vue'
// 全局注册组件
import './components'
import "./style/reset.scss"


Vue.use(Vcharts)



new Vue({
    el: '#main',
    store,
    router
    // render: (h) => h(Home)
})
