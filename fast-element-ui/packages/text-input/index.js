// @ts-nocheck
/**
 * @desc input 输入框控件
 */
import { devConsole } from '../helper/util.js'
import _omit from 'lodash/omit'
import _includes from 'lodash/includes'
import _has from 'lodash/has'
import _keys from 'lodash/keys'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

const FastTextInput = {
  name: 'FastTextInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'inputChange'
  },
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    resize: {
      type: String,
      default: 'both',
      validator: function (value) {
        return _includes(['none', 'both', 'horizontal', 'vertical'], value)
      }
    },
    width: {
      type: String,
      default: 'auto'
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
    slotType: {
      type: String,
      default: 'prepend',
      validator: function (value) {
        return _includes(['prefix', 'suffix', 'prepend', 'append'], value)
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
      if (value !== oldValue && this.vValue !== value) {
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
        this.listeners &&
        _has(this.listeners, 'blur')
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
        this.listeners &&
        _has(this.listeners, 'focus')
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
        this.listeners &&
        _has(this.listeners, 'change')
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
        this.listeners &&
        _has(this.listeners, 'clear')
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
        this.listeners &&
        _has(this.listeners, 'inputChange')
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
        for (const key in b) {
          const elem = b[key]
          nodes.push(
            h('template', { slot: key }, [
              h('div', { domProps: { innerHTML: elem.template } })
            ])
          )
        }
        /* for (const [key, elem] of Object.entries(b)) {
          nodes.push(
            h('template', { slot: key }, [
              h('div', { domProps: { innerHTML: elem.template } })
            ])
          )
        } */
      }
      const appendSlot = function (b) {
        for (const key in b) {
          const vNode = b[key]
          nodes.push(h('template', { slot: key }, vNode))
        }
        /* for (const [key, vNode] of Object.entries(b)) {
          nodes.push(h('template', { slot: key }, vNode))
        } */
      }
      if (
        _isEmpty(this.$slots) &&
        _isEmpty(this.slotNode) &&
        !_isEmpty(this.label)
      ) {
        nodes.push(h('template', { slot: this.slotType }, this.label))
        return nodes
      }
      if (
        !_isEmpty(this.$slots) && !_isEmpty(this.slotNode)
      ) {
        appendSlot(this.$slots)
        appendSlotNode(_omit(this.slotNode, _keys(this.$slots)))
      }
      if (_isEmpty(this.$slots) && !_isEmpty(this.slotNode)) {
        appendSlotNode(this.slotNode)
      }
      if (_isEmpty(this.slotNode) && !_isEmpty(this.$slots)) {
        appendSlot(this.$slots)
      }
      return nodes
    }
  },
  render (h) {
    // v-if
    if (!this.isRender) {
      return h()
    }
    // const style = { ...this.$props.ctStyle, width: this.width }
    const style = _assign({}, this.$props.ctStyle, { width: this.width })
    // v-show
    if (!this.isDisplay) {
      style.display = 'none'
    }
    return h(
      'el-input',
      {
        ref: `${this._uid}-el-input-ref`,
        class: this.$props.ctCls || {},
        style,
        attrs: {
          id: this.$attrs.id,
          autofocus: this.$attrs.autofocus,
          placeholder: this.$attrs.placeholder
        },
        props: _assign({}, this.$attrs, {
          type: this.type,
          resize: this.resize,
          value: this.vValue
        }),
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

FastTextInput.install = function (Vue, ElInput) {
  // 用于按需加载的时候独立使用
  devConsole(FastTextInput.name + '----install----')
  if (ElInput) {
    Vue.use(ElInput)
  }
  Vue.component(FastTextInput.name, FastTextInput)
}
export default FastTextInput
