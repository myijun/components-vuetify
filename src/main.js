import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import qs from 'qs'
import proxyTable from './components/table/src/proxyTable';

// 请求头拦截
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$qs = qs


Vue.config.productionTip = false


proxyTable.$http = Vue.prototype.$http;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
