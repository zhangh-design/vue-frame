/**
 * @desc input 文本域输入控件
 */
import { devConsole } from '../helper/util.js'
import FastTextInput from '../text-input/index.js'
import _includes from 'lodash/includes'

const FastTextArea = {
  name: 'FastTextArea',
  extends: FastTextInput,
  props: {
    type: {
      type: String,
      default: 'textarea'
    },
    resize: {
      type: String,
      default: 'both',
      validator: function (value) {
        return _includes(['none', 'both', 'horizontal', 'vertical'], value)
      }
    }
  }
}
FastTextArea.install = function (Vue, ElInput) {
  // 用于按需加载的时候独立使用
  devConsole(FastTextArea.name + '----install----')
  if (ElInput) {
    Vue.use(ElInput)
  }
  Vue.component(FastTextArea.name, FastTextArea)
}
export default FastTextArea
