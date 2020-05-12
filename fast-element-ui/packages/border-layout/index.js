// @ts-nocheck
import { devConsole } from '../helper/util.js'
import BorderLayout from './border.vue'

BorderLayout.install = function (Vue, ElComponents) {
  // 用于按需加载的时候独立使用
  devConsole(BorderLayout.name + '----install----')
  if (ElComponents) {
    for (let i = 0; i < ElComponents.length; i++) {
      Vue.use(ElComponents[i])
    }
  }
  Vue.component(BorderLayout.name, BorderLayout)
}

export default BorderLayout
