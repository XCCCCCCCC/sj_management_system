import member from './member'
import app from './app'
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
  modules: { member, app },
}
