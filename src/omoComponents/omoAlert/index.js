import Alert from './alert.vue'
import Vue from 'vue';

let instance;
console.log('Alert', Alert);
function Instance() {
  if (instance) return instance;
  // 1. 直接new
  // instance = new Vue(Alert);

  // 2. render 方式
  instance = new Vue({
    render(h) {
      return h(Alert)
    }
  })

  // 3.
  //  const extend = Vue.extend(Alert);
  //  instance = new extend()


  const component = instance.$mount();
  document.body.appendChild(component.$el);

  console.log('instance:', instance)
  console.log('instance child:', instance.$children[0])
}
Instance()
