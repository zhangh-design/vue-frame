/**
 * @desc input 输入密码框控件
 */
import FastTextInput from './text-input.js'

const FastTextPassword = {
  extends: FastTextInput,
  props: {
    type: {
      type: String,
      default: 'password'
    }
  }
}
export default FastTextPassword
