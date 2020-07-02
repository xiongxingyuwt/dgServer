import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/common.less'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(elementUi)

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
