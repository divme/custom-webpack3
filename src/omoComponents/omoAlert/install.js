import Alert from './alert';

Alert.install = (Vue) => {
  Vue.prototype.$alert = Alert;
};

export default Alert
