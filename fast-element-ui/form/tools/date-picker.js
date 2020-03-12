// @ts-nocheck
/**
 *  DatePicker 日期选择器
 */
import _get from 'lodash/get'
import _set from 'lodash/set'
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'
import { DatePicker } from 'element-ui'

const FastDatePicker = {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'dateChange'
  },
  props: {
    ...DatePicker.mixins[0].props,
    ...DatePicker.props,
    width: {
      type: String,
      default: '100%'
    },
    ctStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    ctCls: {
      type: Object,
      default () {
        return {}
      }
    },
    isRender: {
      type: Boolean,
      default: true
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    listeners: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      vValue: this.value
    }
  },
  watch: {
    value (value, oldValue) {
      if (value !== oldValue && this.vValue !== value) {
        this.vValue = value
      }
    }
  },
  methods: {
    /**
     * @desc 当 Input 失去焦点时触发
     * @event FastDatePicker#_blurEvent
     * @param {*} event
     */
    _blurEvent (event) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
      Reflect.has(this.listeners, 'blur')
      ) {
        this.listeners.blur(event)
        return
      }
      this.$emit('blur', event)
    },
    /**
   * @desc 在 Input 获得焦点时触发
   * @event FastDatePicker#_focusEvent
   * @param {*} event
   */
    _focusEvent (event) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
      Reflect.has(this.listeners, 'focus')
      ) {
        this.listeners.focus(event)
        return
      }
      this.$emit('focus', event)
    },
    /**
   * @desc 用户确认选定的值时触发
   * @event FastDatePicker#_changeEvent
   * @param {*} value
   */
    _changeEvent (value) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
      Reflect.has(this.listeners, 'change')
      ) {
        this.listeners.change(value)
        return
      }
      this.$emit('change', value)
    },
    /**
     * @desc datePicker 值改变时触发
     * @event FastDatePicker#_datePickerChangeEvent
     * @param {string} value - datePicker 值
     */
    _datePickerChangeEvent (value) {
      // 事件监听
      if (
        _isEqual(_isNil(this.listeners), false) &&
        Reflect.has(this.listeners, 'dateChange')
      ) {
        this.listeners.dateChange(value)
        return
      }
      // v-model
      this.$emit('dateChange', value)
    },
    /**
   * @desc 使 input 获取焦点
   * @method
   */
    focus () {
      this.$refs[`${this._uid}-el-date-picker-ref`].focus()
    }
  },
  render (h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h()
    }
    const style = { ..._get(this.$props, 'ctStyle', {}), width: this.width }
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none')
    }
    return h(
      'el-date-picker',
      {
        ref: `${this._uid}-el-date-picker-ref`,
        class: _get(this.$props, 'ctCls', {}),
        style,
        attrs: this.$attrs,
        props: { ...this.$props, value: this.vValue },
        on: {
          change: this._changeEvent,
          blur: this._blurEvent,
          focus: this._focusEvent,
          input: value => {
            // v-model
            this.vValue = value
            this._datePickerChangeEvent(this.vValue)
          }
        }
      },
      []
    )
  }
}
export default FastDatePicker
