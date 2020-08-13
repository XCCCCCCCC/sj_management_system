import axios from 'axios'
import { Message, Loading } from 'element-ui'
// import { delCookie } from '@/utils/filter.js'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
// axios.defaults.headers.common['accountid'] = '10000';
// axios.defaults.headers.common['token'] = '1fQ3h8P03eUcL4Vb';

// const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://10.8.17.183:8080' : 'http://' + location.host
let loadingvm = null
const config = {
  baseURL: process.env.NODE_ENV === 'development' ? '/test/api/v3' : location.protocol + '//' + location.host + '/api/v3',
  timeout: 60000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
}
const CancelToken = axios.CancelToken
const source = CancelToken.source()
window.axiosCancel = source
const _axios = axios.create(config)
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // config.cancelToken = new axios.CancelToken((cancel) => {
    //   window.axios_cancel.push({cancel: cancel})
    // })
    loadingvm = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    config.cancelToken = window.axiosCancel.token
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    loadingvm.close()
    if (response.data.resCode === '000000') {
      return response.data
    } else if (response.data.resCode === '021000') {
      // eslint-disable-next-line new-cap
      Message({
        message: '会员身份校验失败',
        type: 'error',
      })
    } else if (response.data.resCode === '021999') {
      // eslint-disable-next-line new-cap
      Message({
        message: response.data.resMsg,
        type: 'error',
      })
    }
  },
  function(error) {
    const res = error.response
    loadingvm.close()
    // eslint-disable-next-line new-cap
    Message({
      message: '请求失败',
      type: 'error',
      onClose: () => {
        if (res.status === 401 || res.status === 403 || res.status === 404 || res.status === 302) {
          // handleErr
        }
      },
    })
    return Promise.reject(error)
  },
)
export default _axios
