import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import {Button} from 'mint-ui'

// 引入mock数据，
// 映入方式类似于引入css样式
import './mock/mockServer'

// 在入口js引入， 相当于全局的，都可以使用
// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>



new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
