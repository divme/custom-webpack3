import Vue from 'vue'

// 组件注册
const modules = require.context('./', true, /\.vue$/)
modules.keys().forEach((key) => {
  const cur = modules(key)
  Vue.component(cur.name, cur);
})

// // 插件式引用
// const modules2 = require.context('./', true, /index\.js$/);
// modules2.keys().forEach((key) => {
//   const cur = modules(key)
//   Vue.use(cur.name, cur);
// })
