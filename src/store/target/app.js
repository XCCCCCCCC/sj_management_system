import { memberApi, appApi } from '@/services/api-target'
const state = {
  keyword: '',
  page: 1,
  pageSize: 10,
  total: 1,
  tableHeader: [
    {
      prop: 'id',
      label: '成员编号',
      align: 'right',
    },
    {
      prop: 'name',
      label: '成员名称',
      align: 'left',
    },
    {
      prop: 'appId',
      label: '应用编号',
      align: 'right',
    },
    {
      prop: 'status',
      label: '状态',
      align: 'left',
      render: (status) => {
        if (status === '00') {
          return `<span class="available">可用</span>`
        } else {
          return `<span class="unavailable">不可用</span>`
        }
      },
    },
  ],
  memberList: [],
  list: [],
  id: '',
  keyDetail: {
    id: '',
    name: '',
    appId: '',
    publicKey: '',
    privateKey: '',
    token: '',
    xAppCode: '',
    xRegCode: '',
    status: '',
  },
  detail: {
    name: '',
    id: '',
  },
  showDialog: false,
  showKeyDialog: false,
}
const getters = {}
const actions = {
  async getList({ dispatch, commit, state, rootState }) {
    const res1 = await memberApi.getTotalList({})
    commit('updateMemberList', res1.data)
    const res2 = await appApi.getList({
      // memberId: state.keyword,
      page: state.page - 1,
      size: state.pageSize,
    })
    commit('updateList', res2.data)
    return res2
  },
  async add({ dispatch, commit, state, rootState }) {
    const res = await appApi.add({
      memberId: state.detail.id,
      orgFullName: state.detail.name,
      // xAppcode: '',
      // xRegCode: '',
    })
    return res
  },
  async update({ dispatch, commit, state, rootState }) {
    const res = await appApi.update({
      memberId: state.keyDetail.id,
      orgFullName: state.keyDetail.name,
      appId: state.keyDetail.appId,
      xAppCode: state.keyDetail.xAppCode,
      xRegCode: state.keyDetail.xRegCode,
      status: state.keyDetail.status,
    })
    return res
  },
  async toggleStatus({ dispatch, commit, state, rootState }, status) {
    const res = await appApi.update({
      memberId: state.keyDetail.id,
      orgFullName: state.keyDetail.name,
      appId: state.keyDetail.appId,
      xAppCode: state.keyDetail.xAppCode,
      xRegCode: state.keyDetail.xRegCode,
      status,
    })
    return res
  },
}
const mutations = {
  resetKeyDetail(state) {
    state.keyDetail.id = ''
    state.keyDetail.name = ''
    state.keyDetail.appId = ''
    state.keyDetail.publicKey = ''
    state.keyDetail.privateKey = ''
    state.keyDetail.token = ''
    state.keyDetail.xAppCode = ''
    state.keyDetail.xRegCode = ''
    state.keyDetail.status = ''
  },
  updateKeyDetail(state, obj) {
    state.keyDetail.id = obj.id
    state.keyDetail.name = obj.name
    state.keyDetail.appId = obj.appId
    state.keyDetail.publicKey = obj.publicKey
    state.keyDetail.privateKey = obj.privateKey
    state.keyDetail.token = obj.token
    state.keyDetail.xAppCode = obj.xAppCode
    state.keyDetail.xRegCode = obj.xRegCode
    state.keyDetail.status = obj.status
  },
  resetDetail(state) {
    state.detail.id = ''
    state.detail.name = ''
  },
  updateKeyword(state, val) {
    state.keyword = val
  },
  updatePage(state, val) {
    state.page = val
  },
  updateList(state, obj) {
    state.list = obj.content.map((app) => ({
      id: app.memberId,
      name: app.orgFullName,
      appId: app.appId,
      publicKey: '',
      privateKey: '',
      token: app.token,
      xAppCode: app.xAppCode || '',
      xRegCode: app.xRegCode || '',
      status: app.status || '00',
    }))
    state.total = obj.totalElements
  },
  updateMemberList(state, arr) {
    state.memberList = arr.map((member) => ({
      id: member.memberId,
      name: member.orgFullName,
      num: member.appNo,
      credit: member.unifiedSocialCreditCode,
      contact: member.contactName,
      phone: member.contactPhone,
      email: member.contactEmail,
      date: member.createDate,
    }))
  },
  updateShowDialog(state, val) {
    state.showDialog = val
  },
  updateShowKeyDialog(state, val) {
    state.showKeyDialog = val
  },
  updateXAppCode(state, val) {
    state.keyDetail.xAppCode = val
  },
  updateXRegCode(state, val) {
    state.keyDetail.xRegCode = val
  },
  updateId(state, val) {
    state.detail.id = val
    state.detail.name = state.memberList.find((member) => member.id === state.detail.id).name
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
