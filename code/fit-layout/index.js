// @ts-nocheck
import { devConsole } from '../helper/util.js'
import FitLayout from './fit.vue'

FitLayout.install = function (Vue, ELContainer) {
  // 用于按需加载的时候独立使用
  devConsole(FitLayout.name + '----install----')
  if (ELContainer) {
    Vue.use(ELContainer)
  }
  Vue.component(FitLayout.name, FitLayout)
}

export default FitLayout
