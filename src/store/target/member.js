import { memberApi } from '@/services/api-target'
const state = {
  keyword: '',
  page: 1,
  pageSize: 10,
  total: 0,
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
      prop: 'num',
      label: '应用数',
      align: 'right',
    },
    {
      prop: 'date',
      label: '创建日期',
      align: 'left',
    },
  ],
  list: [],
  id: '',
  type: '',
  detail: {
    id: '',
    name: '',
    credit: '',
    contact: '',
    phone: '',
    email: '',
  },
  showDialog: false,
}
const getters = {}
const actions = {
  async getList({ dispatch, commit, state, rootState }) {
    const res = await memberApi.getList({
      // memberId: state.keyword,
      page: state.page - 1,
      size: state.pageSize,
    })
    commit('updateList', res.data)
    return res
  },
  async add({ dispatch, commit, state, rootState }) {
    const res = await memberApi.add({
      orgFullName: state.detail.name,
      unifiedSocialCreditCode: state.detail.credit,
      contactName: state.detail.contact,
      contactPhone: state.detail.phone,
      contactEmail: state.detail.email,
    })
    return res
  },
  async update({ dispatch, commit, state, rootState }) {
    const res = await memberApi.update({
      memberId: state.detail.id,
      orgFullName: state.detail.name,
      unifiedSocialCreditCode: state.detail.credit,
      contactName: state.detail.contact,
      contactPhone: state.detail.phone,
      contactEmail: state.detail.email,
    })
    return res
  },
}
const mutations = {
  resetDetail(state) {
    state.detail.id = ''
    state.detail.name = ''
    state.detail.credit = ''
    state.detail.contact = ''
    state.detail.phone = ''
    state.detail.email = ''
  },
  updateDetail(state, obj) {
    state.detail.id = obj.id
    state.detail.name = obj.name
    state.detail.credit = obj.credit
    state.detail.contact = obj.contact
    state.detail.phone = obj.phone
    state.detail.email = obj.email
  },
  updateKeyword(state, val) {
    state.keyword = val
  },
  updatePage(state, val) {
    state.page = val
  },
  updateList(state, obj) {
    state.list = obj.content.map((member) => ({
      id: member.memberId,
      name: member.orgFullName,
      num: member.appNo,
      credit: member.unifiedSocialCreditCode,
      contact: member.contactName,
      phone: member.contactPhone,
      email: member.contactEmail,
      date: member.createDate,
    }))
    state.total = obj.totalElements
  },
  updateId(state, val) {
    state.id = val
  },
  updateType(state, val) {
    state.type = val
  },
  updateShowDialog(state, val) {
    state.showDialog = val
  },
  updateName(state, val) {
    state.detail.name = val
  },
  updateCredit(state, val) {
    state.detail.credit = val
  },
  updateContact(state, val) {
    state.detail.contact = val
  },
  updatePhone(state, val) {
    state.detail.phone = val
  },
  updateEmail(state, val) {
    state.detail.email = val
  },
  reset() {
    state.detail.id = ''
    state.detail.name = ''
    state.detail.credit = ''
    state.detail.contact = ''
    state.detail.phone = ''
    state.detail.email = ''
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
