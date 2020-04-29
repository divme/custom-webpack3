import Vue from "vue"
import router from './router'
import store from "./store"


import Vcharts from 'v-charts'

import Entry from './entry.vue'
// import Home from './Home.vue'
// 全局注册组件
import './components'
import "./style/reset.scss"

import '@/omoComponents/components'

// js 方式  与 插件式使用组件
import omoMessage from '@/omoComponents/omoMessage/command'
import zMessage from '@/omoComponents/omoMessage/install'

import '@/omoComponents/omoAlert';

// mixins: 事件广播
import Mixin from '@/mixins/contact'
Vue.mixin(Mixin);


Vue.use(Vcharts)
// Vue.use(zMessage)


Vue.prototype.$zmessage = omoMessage;

Vue.config.errorHandler = (err, vm, info) => {
    console.log('Error form:', vm.$options.name || vm.$route.fullPath);
};

new Vue({
    el: '#main',
    store,
    router,
    render: (h) => h(Entry)
})
