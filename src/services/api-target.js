import axios from '@/libs/_axios'
import { member, app, order } from '@/consts/path'
const memberApi = {
  getList: async (params) => {
    const res = await axios.get(member.getList, { params })
    return res
  },
  getTotalList: async (params) => {
    const res = await axios.get(member.getTotalList, { params })
    return res
  },
  getDetail: async (params) => {
    const res = await axios.get(member.getDetail, { params })
    return res
  },
  add: async (data) => {
    const res = await axios.post(member.add, data)
    return res
  },
  update: async (data) => {
    const res = await axios.post(member.update, data)
    return res
  },
}
const appApi = {
  getList: async (params) => {
    const res = await axios.get(app.getList, { params })
    return res
  },
  getTotalList: async (params) => {
    const res = await axios.get(app.getTotalList, { params })
    return res
  },
  getDetail: async (params) => {
    const res = await axios.get(app.getDetail, { params })
    return res
  },
  add: async (data) => {
    const res = await axios.post(app.add, data)
    return res
  },
  update: async (data) => {
    const res = await axios.post(app.update, data)
    return res
  },
}
const orderApi = {
  getList: async (params) => {
    const res = await axios.get(order.getList, { params })
    return res
  },
  getDetail: async (params) => {
    const res = await axios.get(order.getDetail, { params })
    return res
  },
  add: async (data) => {
    const res = await axios.post(order.add, data)
    return res
  },
  update: async (data) => {
    const res = await axios.post(order.update, data)
    return res
  },
}
export { memberApi, appApi, orderApi }
