// @ts-nocheck
/**
 * @desc fastElementUI 框架插件初始化入口
 */
/* import _set from 'lodash/set'
// import _get from 'lodash/get'
// import _cloneDeep from 'lodash/cloneDeep'
import { extend } from './helper/extend.js'

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
// 命名空间
window.$ns = namespace
window.$ns('fastUI')
// 基类 （用于继承的顶层对象）
const baseFnName = 'fastUI.js.base'
window.$ns(baseFnName)
_set(window, `${baseFnName}.fn`, function () {})
_set(window, `${baseFnName}.fn.prototype.initComponent`, function () {})
// 继承类
fastUI.extend = extend
export default {
  install (Vue, options = {}) {
    // 设置命名空间
    // console.info(Object.keys(options));
    let elem;
    const _hasOwnProperty = Object.prototype.hasOwnProperty;
    for (elem of Object.keys(options).values()) {
      if (_hasOwnProperty.call(options[elem], 'props')) {
        _set(window.fastUI, `${elem}.props`, _cloneDeep(_get(options, `${elem}.props`)))
      }
    }
  }
} */
export default {
  install (Vue, options = {}) {
    // 现在没有写代码，等待后期整套框架写完后应该是需要这么一个初始化接口的
  }
}
