import Vue from 'vue';
import Message from './src';

Message.install = (Vue) => {
  Vue.component(Message.name, Message);
};

export default Message
