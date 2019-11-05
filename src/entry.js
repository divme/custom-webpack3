import Vue from "vue"
import store from "./store"
import VueRouter from 'vue-router'
import routes from './router'
import Vcharts from 'v-charts'
// import Entry from 'entry'
// import Home from 'Home.vue'
import "./style/reset.scss"

Vue.use(Vcharts)
Vue.use(VueRouter)

const router = new VueRouter({
    mode:"history",
    routes
});

new Vue({
    el: '#main',
    store,
    router
    // render: (h) => h(Entry)
})
