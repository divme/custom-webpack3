import Vue from "vue"
import store from "./store"
import VueRouter from 'vue-router'
import routes from './router/router'
import Vcharts from 'v-charts'


Vue.use(Vcharts);
Vue.use(VueRouter);

const router = new VueRouter({
    // mode:"history",
    routes
});

new Vue({
    el: '#main',
    store,
    router
});