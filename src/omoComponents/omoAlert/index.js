import Alert from './alert.vue'
import Vue from 'vue';

let instance;
function createInstance(options) {
  if (instance) return instance;
  const props = options || {};

  // 1. 直接 new
  // instance = new Vue(Alert);

  // 2. extend 方式
  //  const extend = Vue.extend(Alert);
  //  instance = new extend()

  // 3. render 方式
  const vueInstance = new Vue({
    render(h) {
      return h(Alert, {
        props
      })
    }
  });

  console.log('1:', vueInstance)
  const component = vueInstance.$mount();

  console.log('2:', vueInstance.$children[0])
  document.body.appendChild(component.$el);

  console.log('3:', vueInstance.$children[0])
  const alert = vueInstance.$children[0];
  // alert.add(options);

  // console.log('vueInstance:', vueInstance);
  // console.log('vueInstance child:', vueInstance.$children[0]);

  instance = {
    add(options) {
      alert.add(options)
    }
  }
  return instance;
}

export default function add(options) {
  // Alert.Instance(options)
  const cur = createInstance();
  cur.add(options);
}

