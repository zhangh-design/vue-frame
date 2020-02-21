// @ts-nocheck
/**
 * InputNumber 计数器
 */
import _set from 'lodash/set'
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'
import { InputNumber } from 'element-ui'

const FastInputNumber = {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'inputNumberChange'
  },
  props: {
    ...InputNumber.props,
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
     * @desc 在组件 Input 失去焦点时触发
     * @event FastInputNumber#_blurEvent
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
     * @desc 在组件 Input 获得焦点时触发
     * @event FastInputNumber#_focusEvent
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
     * @desc 绑定值被改变时触发
     * @event FastInputNumber#_changeEvent
     * @param {number} value
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
     * @desc input 值改变时触发 v-model
     * @event FastInputNumber#_inputChangeEvent
     * @param {number} value - input 值
     */
    _inputChangeEvent (value) {
      // 事件监听
      if (
        _isEqual(_isNil(this.listeners), false) &&
        Reflect.has(this.listeners, 'inputNumberChange')
      ) {
        this.listeners.inputNumberChange(value)
        return
      }
      // v-model
      this.$emit('inputNumberChange', value)
    },
    /**
     * @desc 使 input 获取焦点
     * @method
     */
    focus () {
      this.$refs[`${this._uid}-el-input-number-ref`].focus()
    },
    /**
     * @desc 选中 input 中的文字
     * @method
     */
    select () {
      this.$refs[`${this._uid}-el-input-number-ref`].select()
    }
  },
  render (h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h()
    }
    const style = {}
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none')
    }
    return h('el-input-number', {
      ref: `${this._uid}-el-input-number-ref`,
      style,
      attrs: this.$attrs,
      props: { ...this.$props, value: this.vValue },
      on: {
        blur: this._blurEvent,
        focus: this._focusEvent,
        change: this._changeEvent,
        input: value => {
          // v-model
          this.vValue = value
          this._inputChangeEvent(this.vValue)
        }
      }
    })
  }
}
export default FastInputNumber
