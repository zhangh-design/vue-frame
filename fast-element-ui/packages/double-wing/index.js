// @ts-nocheck
import { devConsole } from '../helper/util.js'
import DoubleWingLayout from './double-wing.vue'

DoubleWingLayout.install = function (Vue) {
  // 用于按需加载的时候独立使用
  devConsole(DoubleWingLayout.name + '----install----')
  Vue.component(DoubleWingLayout.name, DoubleWingLayout)
}

export default DoubleWingLayout
