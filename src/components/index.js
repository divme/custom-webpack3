import Vue from 'vue'
function formatName(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
const components = require.context('./', true, /\.vue$/)
components.keys().forEach((key) => {
    const config = components(key)
    // const name = formatName(key.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    // 带路径的，去掉路径
    const arr = key.split('/')
    const name = formatName(arr[arr.length - 1].replace(/\.\w+$/, ''))
    Vue.component(name, config.default || config )
})
