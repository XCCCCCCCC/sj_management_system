import Vue from 'vue'
import Vuex from 'vuex'
import target from './target/index.js'
import order from './order/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { target, order },
})
