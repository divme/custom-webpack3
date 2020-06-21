import Vue from "vue"
import router from './router'
import store from "./store"

import Vcharts from 'v-charts'

import Entry from './entry.vue'
// import Home from './Home.vue'

// 全局注册组件
import './components'
import "./style/reset.scss"

import '@/omoui/components'

// js 方式  与 插件式使用组件
import omoMessage from '@/omoui/omoMessage/command'
import zMessage from '@/omoui/omoMessage/install'

// mixins: 事件广播
import Mixin from '@/mixins/contact'

// 引入函数式调用组件
// 方式一： 导出的是个方法，直接挂载到原型上
import alert from '@/omoui/omoAlert';
Vue.prototype.$alert = alert;

// 方式二：直接引入就自动调用，没人这么用

Vue.prototype.$zmessage = omoMessage;

Vue.mixin(Mixin);


Vue.use(Vcharts)
// Vue.use(zMessage)



Vue.config.errorHandler = (err, vm, info) => {
    console.log('Error form:', vm.$options.name || vm.$route.fullPath);
    console.log(info);
};


console.log('entry', Entry)
new Vue({
    el: '#main',
    store,
    router,
    render: (h) => h(Entry)
})
