import list from './list'
import operation from './operation'
const state = {}
const getters = {}
const actions = {}
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { list, operation },
}
