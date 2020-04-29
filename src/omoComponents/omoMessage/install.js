import Message from './src';

Message.install = (Vue) => {
  Vue.component(Message.name, Message);
};

export default Message
