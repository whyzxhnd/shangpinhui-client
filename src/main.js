import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import { Button, MessageBox } from 'element-ui';

// 引入vuex
import store from './store'
// 引入模拟服务数据
import '@/mock/mockServe'
// 1.引入轮播样式
import "swiper/css/swiper.css"
// 引入所有的api文件
import * as API from "@/api"


import VueLazyload from 'vue-lazyload'
import atm from "@/assets/1.gif"

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  // 懒加载默认图片
  loading: atm,
  attempt: 1
})

Vue.config.productionTip = false
// 入口文件,挂载到index.html中

// 注册全局组件
// 1,三级联动组件
import TypeNav from '@/components/TypeNav'
// 2. 注册轮播图组件
import Carousel from "@/components/Carousel"
// 3. 分页组件
import Pagination from "@/components/Pagination"

// 注册 (第一个参数:全局组件的名字,第二个参数:哪一个组件)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 第一种 注册button组件
Vue.component(Button.name, Button)
// 第二种方式 挂载到原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入自定义插件 
import myPlugins from '@/plugins/myPlugins'
// 使用 v-upper ,使用自定义插件
Vue.use(myPlugins, {
  name: 'upper'
})
// 引入表单验证的插件
import "@/plugins/validate"




new Vue({
  render: h => h(App),
  // 配置全局事务总线
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将所有的api接口挂载到$api上
    Vue.prototype.$API = API
  },
  router, // $route, $router
  store,  //注册之后,组件会多一个 $store属性.

}).$mount('#app')

