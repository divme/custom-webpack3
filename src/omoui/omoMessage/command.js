import Vue from 'vue';
import Message from './src';

// 获取扩展子类
let messageInstance = Vue.extend(Message);

let instance;

export default (options) => {
  if (!instance) {
    instance = new messageInstance();
    document.body.appendChild(instance.$mount().$el);
  }
  Object.assign(instance, options)
  return instance.show((vm) => {
    instance = null
  })
}
