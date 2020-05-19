/**
 * Dropdown 下拉菜单
 */
import { devConsole } from '../helper/util.js'
import _omit from 'lodash/omit'
import _get from 'lodash/get'
import _set from 'lodash/set'
import _isEqual from 'lodash/isEqual'
import _assign from 'lodash/assign'
import _has from 'lodash/has'

const FastDropdown = {
  name: 'FastDropdown',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'colorChange'
  },
  props: {
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default () {
        return []
      }
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
    }
  },
  computed: {
    createElDropdown () {
      if (_has(this.$attrs, 'split-button') && _get(this.$attrs, 'split-button', false)) {
        return this.title
      } else {
        return this.$createElement('span', { class: { 'el-dropdown-link': true } }, [
          this.title,
          this.$createElement('i', {
            class: { 'el-icon-arrow-down': true, 'el-icon--right': true }
          })
        ])
      }
    },
    createElDropdownItem () {
      const items = []
      for (let i = 0; i < this.options.length; i++) {
        const item = this.$createElement(
          'el-dropdown-item',
          {
            class: _get(this.options[i], 'class', null),
            props: _omit(this.options[i], ['text', 'class'])
          },
          [_get(this.options[i], 'text', '')]
        )
        items.push(item)
      }
      return this.$createElement('el-dropdown-menu', items)
    }
  },
  data () {
    return {}
  },
  methods: {},
  render (h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h()
    }
    const style = _assign({}, _get(this.$props, 'ctStyle'))
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none')
    }
    return h(
      'el-dropdown',
      {
        ref: `${this._uid}-el-dropdown-ref`,
        class: _get(this.$props, 'ctCls'),
        style,
        props: this.$attrs,
        on: this.$listeners
      },
      [
        this.createElDropdown,
        this.createElDropdownItem
      ]
    )
  }
}

FastDropdown.install = function (Vue, ELComponents = []) {
  // 用于按需加载的时候独立使用
  devConsole(FastDropdown.name + '----install----')
  if (ELComponents && ELComponents.length > 0) {
    for (let i = 0; i < ELComponents.length; i++) {
      Vue.use(ELComponents[i])
    }
  }
  Vue.component(FastDropdown.name, FastDropdown)
}

export default FastDropdown
