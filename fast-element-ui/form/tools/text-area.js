/**
 * @desc input 文本域输入控件
 */
import FastTextInput from './text-input.js'

const FastTextArea = {
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
        return ['none', 'both', 'horizontal', 'vertical'].includes(value)
      }
    }
  }
}
export default FastTextArea
