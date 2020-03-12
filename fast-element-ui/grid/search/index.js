/**
 * search 面板
 */
import FastForm from '../../form/index.js'
import _has from 'lodash/has'

const FastGridSearch = {
  components: {
    FastForm
  },
  inject: ['getFastGrid'],
  props: {
    // 配置详情
    detail: {
      type: Array,
      default () {
        return []
      }
    }
  },
  render (h) {
    console.info('aaaa', this.$slots.default);
    if (_has(this.$slots, 'default')) {
      return h('div', { style: 'height: 100%;' }, [this.$slots.default])
    } else {
      console.info('渲染配置参数');
      return h('div', ['渲染配置参数'])
    }
  }
}
export default FastGridSearch
