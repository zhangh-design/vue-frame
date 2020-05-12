// @ts-nocheck
import { devConsole } from '../helper/util.js'
import FormLayout from './form.vue'

FormLayout.install = function (Vue, ELComponents = []) {
  // Row Col FormItem
  // 用于按需加载的时候独立使用
  devConsole(FormLayout.name + '----install----')
  if (ELComponents && ELComponents.length > 0) {
    for (let i = 0; i < ELComponents.length; i++) {
      Vue.use(ELComponents[i])
    }
  }
  Vue.component(FormLayout.name, FormLayout)
}

export default FormLayout
