import Vue from 'vue'
function formatName(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
debugger
const components = require.context('./', true, /\.vue$/)
components.keys().forEach((key) => {
    const config = components(key)
    const name = formatName(key.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    Vue.component(name, config.default || config )
})
