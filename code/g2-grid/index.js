/**
 * 父子Grid联动
 */
import { devConsole } from '../helper/util.js'
import _get from 'lodash/get'
import _assign from 'lodash/assign'

const FastG2Grid = {
  name: 'FastG2Grid',
  inheritAttrs: false,
  props: {
    northHeight: {
      type: String,
      default: 'auto'
    }
  },
  computed: {},
  data () {
    return {}
  },
  methods: {
    createTabs (slotTabs = []) {
      const tabItems = []
      for (let i = 0; i < slotTabs[0].children.length; i++) {
        const tab = slotTabs[0].children[i]
        tabItems.push(
          this.$createElement('el-tab-pane', { props: tab.data.attrs }, [
            tab.children
          ])
        )
      }
      return this.$createElement(
        'el-tabs',
        {
          props: _assign({}, _get(slotTabs[0].data, 'attrs', {}), this.$attrs),
          on: {
            'tab-click': (tab) => {
              this.$listeners['tabClick'](tab)
            },
            'tab-remove': (name) => {
              this.$listeners['tabRemove'](name)
            },
            'tab-add': () => {
              this.$listeners['tabAdd']()
            },
            'edit': (targetName, action) => {
              this.$listeners['edit'](targetName, action)
            },
            input: (value) => {
              this.$emit('input', value)
            }
          }
        },
        [tabItems]
      )
    }
  },
  render (h) {
    return h(
      'fast-border-layout',
      {
        class: { 'fast-g2-grid': true },
        props: { northHeight: this.northHeight }
      },
      [
        h('template', { slot: 'north' }, [this.$slots.mainGrid]),
        h('template', { slot: 'center' }, [this.createTabs(this.$slots.tabs)])
      ]
    )
  }
}
FastG2Grid.install = function (Vue) {
  // 用于按需加载的时候独立使用
  devConsole(FastG2Grid.name + '----install----')
  Vue.component(FastG2Grid.name, FastG2Grid)
}
export default FastG2Grid
