import { appApi, orderApi } from '@/services/api-target'
const state = {
  keyword: '',
  page: 1,
  pageSize: 10,
  total: 1,
  tableHeader: [
    {
      prop: 'need',
      label: '数据需方',
      align: 'left',
      render: (row) => {
        const str = `<div>${row.need}</div><div>(${row.srcMemberId} ${row.srcAppId})</div>`
        return str
      },
    },
    {
      prop: 'offer',
      label: '数据供方',
      align: 'right',
      render: (row) => {
        const str = `<div>${row.offer}</div><div>(${row.dstMemberId} ${row.dstAppId})</div>`
        return str
      },
    },
    {
      prop: 'odds',
      label: '服务工单号',
      align: 'right',
      minWidth: 150,
      render: (row) => {
        let str = ''
        row.odds.forEach((el) => {
          str += `<div>${el}</div>`
        })
        return str
      },
    },
    {
      prop: 'use',
      label: '服务调用方',
      align: 'right',
      render: (row) => {
        const str = `<div>${row.useLabel.join()}</div><div>${row.useLabel2.join()}</div>`
        return str
      },
    },
    {
      prop: 'no',
      label: '分中心编号',
      align: 'right',
    },
    {
      prop: 'status',
      label: '状态',
      align: 'left',
      render: (row) => {
        if (row.status === '00') {
          return `<span class="available">生效</span>`
        } else {
          return `<span class="unavailable">失效</span>`
        }
      },
    },
  ],
  list: [],
  appList: [],
}
const getters = {}
const actions = {
  async getList({ dispatch, commit, state, rootState }) {
    const res1 = await appApi.getTotalList({})
    commit('updateAppList', res1.data)
    const res2 = await orderApi.getList({
      // memberId: state.keyword,
      page: state.page - 1,
      size: state.pageSize,
    })
    commit('updateList', res2.data)
    return res2
  },
}
const mutations = {
  updateKeyword(state, val) {
    state.keyword = val
  },
  updatePage(state, val) {
    state.page = val
  },
  updateList(state, obj) {
    state.list = obj.content.map((order) => ({
      odd: order.orderId,
      odd2: order.orderId2,
      origin: state.appList.find((app) => app.memberId === order.srcMemberId && app.appId === order.srcAppId).id,
      target: state.appList.find((app) => app.memberId === order.dstMemberId && app.appId === order.dstAppId).id,
      use1: order.mediators,
      use2: order.mediators2,
      srcMemberId: order.srcMemberId,
      dstMemberId: order.dstMemberId,
      srcAppId: order.srcAppId,
      dstAppId: order.dstAppId,
      need: order.srcOrgName,
      offer: order.dstOrgName,
      odds: [order.orderId, order.orderId2],
      no: '999999',
      useLabel: order.mediators.map((mediator) => state.appList.find((app) => app.id === mediator).orgFullName),
      useLabel2: order.mediators2.map((mediator) => state.appList.find((app) => app.id === mediator).orgFullName),
      status: order.status,
    }))
    state.total = obj.totalElements
  },
  updateAppList(state, arr) {
    state.appList = arr
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
