import Vue from 'vue'
import App from './vue/App'
import VueRouter from 'vue-router'
import routerConfig from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import  axios from  'axios';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.axios = axios;
var router= new VueRouter(routerConfig)

new Vue({
  el:'#app',
  render:(h)=>h(App),
  router:router
})
