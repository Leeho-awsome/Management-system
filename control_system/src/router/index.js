import Vue from 'vue'
import Router from 'vue-router'
//@ webpack 会自动 找到src
import login from "@/components/login/login.vue"
import home from "@/components/home/home.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      name:"login",
      path: '/login',
      component:login
      
    },
    {
      name:"home",
      path: '/home',
      component:home
      
    }
  ]
})
