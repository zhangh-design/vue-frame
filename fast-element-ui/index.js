// @ts-nocheck
/**
 * @desc fastElementUI 框架插件初始化入口
 * @example
 * import ElementUI from 'element-ui'
 * import 'element-ui/lib/theme-chalk/index.css'
 *
 * import FastElementUI from './fast-element-ui.js'
 * Vue.use(FastElementUI, ElementUI)
 * Vue.use(ElementUI)
 */
import _set from 'lodash/set'
import _get from 'lodash/get'
import _cloneDeep from 'lodash/cloneDeep'

const namespace = function () {
  var a = arguments; var o = null; var i; var j; var d;
  for (i = 0; i < a.length; i = i + 1) {
    d = a[i].split('.');
    o = window;
    for (j = 0; j < d.length; j = j + 1) {
      o[d[j]] = o[d[j]] || {};
      o = o[d[j]];
    }
  }
  return o;
}
export default {
  install (Vue, options = {}) {
    // 设置命名空间
    window.$ns = namespace
    window.$ns('fastUI')
    let elem;
    const _hasOwnProperty = Object.prototype.hasOwnProperty;
    for (elem of Object.keys(options).values()) {
      if (_hasOwnProperty.call(options[elem], 'props')) {
        _set(window.fastUI, `${elem}.props`, _cloneDeep(_get(options, `${elem}.props`)))
      }
    }
  }
}
