import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import Moment from 'moment'
Vue.prototype.moment = Moment

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
