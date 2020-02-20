// @ts-nocheck
/**
 * @desc input 输入框控件
 */
import _set from 'lodash/set'
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'
import _isNumber from 'lodash/isNumber'
import _isEmpty from 'lodash/isEmpty'
import _omit from 'lodash/omit'
import { Input } from 'element-ui'

const FastTextInput = {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'inputChange'
  },
  props: {
    ...Input.props,
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    isRender: {
      type: Boolean,
      default: true
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    slotType: {
      type: String,
      default: 'prepend',
      validator: function (value) {
        return ['prefix', 'suffix', 'prepend', 'append'].includes(value)
      }
    },
    slotNode: {
      type: Object,
      default: () => {}
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
      if (value !== oldValue) {
        this.vValue = value
      }
    }
  },
  destroyed () {
    this.$destroy()
  },
  methods: {
    /**
     * @desc 在 Input 失去焦点时触发
     * @event FastInput#_blurEvent
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
   * @event FastInput#_focusEvent
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
   * @desc 仅在输入框失去焦点或用户按下回车时触发
   * @event FastInput#_changeEvent
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
   * @desc 在点击由 clearable 属性生成的清空按钮时触发
   * @event FastInput#_clearEvent
   */
    _clearEvent () {
      if (
        _isEqual(_isNil(this.listeners), false) &&
      Reflect.has(this.listeners, 'clear')
      ) {
        this.listeners.clear()
        return
      }
      this.$emit('clear')
    },
    /**
   * @desc input 值改变时触发
   * @event FastInput#_inputChangeEvent
   * @param {string|number} value - input 值
   */
    _inputChangeEvent (value) {
    // 事件监听
      if (
        _isEqual(_isNil(this.listeners), false) &&
      Reflect.has(this.listeners, 'inputChange')
      ) {
        this.listeners.inputChange(value)
        return
      }
      // v-model
      this.$emit('inputChange', value)
    },
    /**
   * @desc 使 input 获取焦点
   * @method
   */
    focus () {
      this.$refs[`${this._uid}-el-input-ref`].focus()
    },
    /**
   * @desc 使 input 失去焦点
   * @method
   */
    blur () {
      this.$refs[`${this._uid}-el-input-ref`].blur()
    },
    /**
   * @desc 选中 input 中的文字
   * @method
   */
    select () {
      this.$refs[`${this._uid}-el-input-ref`].select()
    },
    /**
   * @desc 创建 el-input 控件的 slot 插槽
   * @param {*} h - 渲染函数
   * @method
   */
    _createChildSlotElement (h) {
      const nodes = []
      const appendSlotNode = function (b) {
        for (const [key, elem] of Object.entries(b)) {
          nodes.push(
            h('template', { slot: key }, [
              h('div', { domProps: { innerHTML: elem.template } })
            ])
          )
        }
      }
      const appendSlot = function (b) {
        for (const [key, vNode] of Object.entries(b)) {
          nodes.push(h('template', { slot: key }, vNode))
        }
      }
      if (
        _isEmpty(this.$slots) &&
      _isEmpty(this.slotNode) &&
      _isEqual(_isEmpty(this.label), false)
      ) {
        nodes.push(h('template', { slot: this.slotType }, this.label))
        return nodes
      }
      if (
        _isEqual(_isEmpty(this.$slots), false) &&
      _isEqual(_isEmpty(this.slotNode), false)
      ) {
        appendSlot(this.$slots)
        appendSlotNode(_omit(this.slotNode, Object.keys(this.$slots)))
      }
      if (_isEmpty(this.$slots) && _isEqual(_isEmpty(this.slotNode), false)) {
        appendSlotNode(this.slotNode)
      }
      if (_isEmpty(this.slotNode) && _isEqual(_isEmpty(this.$slots), false)) {
        appendSlot(this.$slots)
      }
      return nodes
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
    if (_isEqual(_isNil(this.width), false) && _isNumber(this.width)) {
      _set(style, 'width', `${this.width}px`)
    }
    if (_isEqual(_isNil(this.height), false) && _isNumber(this.height)) {
      _set(style, 'height', `${this.height}px`)
    }
    return h(
      'el-input',
      {
        ref: `${this._uid}-el-input-ref`,
        style,
        attrs: this.$attrs,
        props: { ...this.$props, value: this.vValue },
        on: {
          blur: this._blurEvent,
          focus: this._focusEvent,
          change: this._changeEvent,
          clear: this._clearEvent,
          input: value => {
          // v-model
            this.vValue = value
            this._inputChangeEvent(this.vValue)
          }
        }
      },
      this._createChildSlotElement(h)
    )
  }
}
export default FastTextInput
