import Vue from 'vue'
import App from './App.vue'
import router from './router'
 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)



// 引入全局样式
import "./assets/global.css"

Vue.config.productionTip = false

// 设置接口的基地址
Vue.axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1';

// 引用图标iconfont
import './assets/font/iconfont.css'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  let t=sessionStorage.getItem('token')
  // 判断是否有令牌,如果有就添加一个
  if(t) config.headers={Authorization: t}
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
