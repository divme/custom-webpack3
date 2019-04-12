import Vue from "vue"
import VueRouter from 'vue-router'
import routes from './router/router'
import Vcharts from 'v-charts'


Vue.use(Vcharts);
Vue.use(VueRouter);
const router = new VueRouter({
    mode:"history",
    routes
});

new Vue({
    router
}).$mount('#main');