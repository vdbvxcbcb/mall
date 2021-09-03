import Toast from './Toast';

const obj = {};

obj.install = function(Vue) {
  const toastConstructor = Vue.extend(Toast);
  const toast = new toastConstructor();
  toast.$mount(document.createElement('body'));
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = (message, duration = 1250) => {
    toast.message = message;
    toast.isShow = true;
    setTimeout(() => {
      toast.isShow = false;
    }, duration);
  };
}

export default obj;
