// @ts-nocheck
/**
 * Button 按钮
 */
import _set from 'lodash/set'
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'
import _isNumber from 'lodash/isNumber'
import _isEmpty from 'lodash/isEmpty'
import { Button } from 'element-ui'

const FastButton = {
  inheritAttrs: false,
  props: {
    ...Button.props,
    text: {
      type: String,
      default: ''
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: function (value) {
        return ['left', 'right'].includes(value)
      }
    },
    slotNode: {
      type: Object,
      default: () => {}
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
  methods: {
    /**
     * @desc 原生点击事件
     * @event FastButton#_nativeClickEvent
     * @param {*} event
     */
    _nativeClickEvent (event) {
      if (_isEqual(_isNil(this.listeners), false) && Reflect.has(this.listeners, 'click')) {
        this.listeners.click(event)
        return
      }
      this.$emit('click', event)
    },
    /**
     * @desc 创建 el-button 控件的 slot 插槽
     * @param {*} h - 渲染函数
     * @method
     */
    _createChildSlotElement (h) {
      const nodes = []
      if (_isEmpty(this.slotNode) && _isEmpty(this.$slots)) {
        nodes.push(h('span', this.text))
      } else if (_isEmpty(this.$slots) && _isEqual(_isEmpty(this.slotNode), false)) {
        nodes.push(h('span', { domProps: { innerHTML: this.slotNode.template } }))
      } else if (_isEqual(_isEmpty(this.$slots), false)) {
        nodes.push(h('span', { slot: 'default' }, this.$slots.default))
      }
      if (this.iconPosition === 'right') {
        nodes.push(h('li', {
          class: {
            [this.icon]: true,
            'el-icon--right': true
          }
        }))
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
      'el-button',
      {
        ref: `${this._uid}-el-button-ref`,
        style,
        attrs: this.$attrs,
        props: { ...this.$props, icon: (this.iconPosition === 'right') ? null : this.icon },
        nativeOn: {
          click: this._nativeClickEvent
        }
      },
      this._createChildSlotElement(h)
    )
  }
}
export default FastButton