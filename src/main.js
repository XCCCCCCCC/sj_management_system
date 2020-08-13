import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'reset-css'
import './libs/element'
import './libs/svg'

Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
