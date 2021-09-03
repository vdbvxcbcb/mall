import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import toast from 'common/toast';

Vue.config.devtools = true;
Vue.config.productionTip = false;

fastClick.attach(document.body);
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.prototype.$bus = new Vue()
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
