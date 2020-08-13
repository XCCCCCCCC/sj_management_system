// 引入svg组件
import iconSvg from '@/components/common/iconSvg'
import Vue from 'vue'
// 全局注册icon-svg
Vue.component('icon-svg', iconSvg)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('@/assets/icons', false, /\.svg$/)
requireAll(req)
