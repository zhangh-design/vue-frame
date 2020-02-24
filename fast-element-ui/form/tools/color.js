// @ts-nocheck
/**
 * Color 颜色选择组件
 */
import _set from 'lodash/set'
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'
import { ColorPicker } from 'element-ui'

const FastColor = {
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'colorChange'
  },
  props: {
    ...ColorPicker.props,
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
   * @desc 当绑定值变化时触发
   * @event FastColor#_changeEvent
   * @param {string} value
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
   * @desc 面板中当前显示的颜色发生改变时触发
   * @event FastColor#_activeChangeEvent
   * @param {string} value
   */
    _activeChangeEvent (value) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
  Reflect.has(this.listeners, 'active-change')
      ) {
        this.listeners['active-change'](value)
        return
      }
      this.$emit('active-change', value)
    },
    /**
   * @desc v-model
   * @event FastInput#_colorChangeEvent
   * @param {string} value - 当前值
   */
    _colorChangeEvent (value) {
    // 事件监听
      if (
        _isEqual(_isNil(this.listeners), false) &&
      Reflect.has(this.listeners, 'colorChange')
      ) {
        this.listeners.colorChange(value)
        return
      }
      // v-model
      this.$emit('colorChange', value)
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
    return h('el-color-picker', {
      ref: `${this._uid}-el-color-picker-ref`,
      style,
      attrs: this.$attrs,
      props: { ...this.$props, value: this.vValue },
      on: {
        change: this._changeEvent,
        'active-change': this._activeChangeEvent,
        input: value => {
          // v-model
          this.vValue = value
          this._colorChangeEvent(this.vValue)
        }
      }
    })
  }
}
export default FastColor
