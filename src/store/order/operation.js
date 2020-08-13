import { appApi, orderApi } from '@/services/api-target'
const state = {
  type: '',
  detail: {
    odd: '',
    odd2: '',
    origin: '',
    target: '',
    use1: [],
    use2: [],
    no: '999999',
    type: '全部',
    limit: '无限',
    srcMemberId: '',
    dstMemberId: '',
    srcAppId: '',
    dstAppId: '',
  },
  fileList: [],
  appList: [],
}
const getters = {}
const actions = {
  async getDetail({ dispatch, commit, state, rootState }) {
    const res = await orderApi.getDetail({
      orderId: state.detail.odd,
    })
    commit('updateList', res.data)
    return res
  },
  async getAppList({ dispatch, commit, state, rootState }) {
    const res = await appApi.getTotalList({})
    commit('updateAppList', res.data)
    return res
  },
  async add({ dispatch, commit, state, rootState }) {
    const res = await orderApi.add({
      srcMemberId: state.detail.srcMemberId,
      dstMemberId: state.detail.dstMemberId,
      srcAppId: state.detail.srcAppId,
      dstAppId: state.detail.dstAppId,
      mediators: state.detail.use1,
      mediators2: state.detail.use2,
      centerCode: '999999',
      idType: '02010102',
    })
    return res
  },
  async update({ dispatch, commit, state, rootState }) {
    const res = await orderApi.update({
      orderId: state.detail.odd,
      orderId2: state.detail.odd2,
      srcMemberId: state.detail.srcMemberId,
      dstMemberId: state.detail.dstMemberId,
      srcAppId: state.detail.srcAppId,
      dstAppId: state.detail.dstAppId,
      mediators: state.detail.use1,
      mediators2: state.detail.use2,
      centerCode: '999999',
      idType: '02010102',
    })
    return res
  },
  async toggleStatus({ dispatch, commit, state, rootState }, status) {
    const res = await orderApi.update({
      orderId: state.detail.odd,
      orderId2: state.detail.odd2,
      srcMemberId: state.detail.srcMemberId,
      dstMemberId: state.detail.dstMemberId,
      srcAppId: state.detail.srcAppId,
      dstAppId: state.detail.dstAppId,
      mediators: state.detail.use1,
      mediators2: state.detail.use2,
      centerCode: '999999',
      idType: '02010102',
      status,
    })
    return res
  },
}
const mutations = {
  resetDetail(state) {
    state.detail.odd = ''
    state.detail.odd2 = ''
    state.detail.origin = ''
    state.detail.target = ''
    state.detail.use1 = []
    state.detail.use2 = []
    state.detail.srcMemberId = ''
    state.detail.dstMemberId = ''
    state.detail.srcAppId = ''
    state.detail.dstAppId = ''
  },
  updateDetail(state, obj) {
    state.detail = obj
  },
  updateAppList(state, arr) {
    state.appList = arr
  },
  updateType(state, val) {
    state.type = val
  },
  updateOrigin(state, val) {
    state.detail.origin = val
    state.detail.srcAppId = state.appList.find((app) => app.id === state.detail.origin).appId
    state.detail.srcMemberId = state.appList.find((app) => app.id === state.detail.origin).memberId
  },
  updateTarget(state, val) {
    state.detail.target = val
    state.detail.dstAppId = state.appList.find((app) => app.id === state.detail.target).appId
    state.detail.dstMemberId = state.appList.find((app) => app.id === state.detail.target).memberId
  },
  updateUse1(state, arr) {
    state.detail.use1 = arr
  },
  updateUse2(state, arr) {
    state.detail.use2 = arr
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {},
}
