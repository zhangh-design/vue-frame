/**
 * @desc input 隐藏控件
 */
import FastTextInput from './text-input.js'

const FastTextHidden = {
  extends: FastTextInput,
  props: {
    type: {
      type: String,
      default: 'hidden'
    }
  }
}
export default FastTextHidden
