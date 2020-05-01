// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入elUI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/global.css"
import aixos from "axios"
import moment from "moment"
Vue.prototype.$http=aixos
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
//全局过滤器处理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format("YYYY-MM--DD")
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
