/**
 * DateTimePicker 日期时间选择器
 */
import FastDatePicker from './date-picker.js'

const FastDateTimePicker = {
  extends: FastDatePicker,
  props: {
    type: {
      type: String,
      default: 'datetime'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    }
  }
}
export default FastDateTimePicker
