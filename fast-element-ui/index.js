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
import FastColor from './form/tools/color.js'
import FastComboBox from './form/tools/combo-box.js'
import FastDatePicker from './form/tools/date-picker.js'
import FastDateTimePicker from './form/tools/date-time-picker.js'
import FastInputNumber from './form/tools/input-number.js'
import FastLabel from './form/tools/label.js'
import FastRadio from './form/tools/radio.js'
import FastSwitch from './form/tools/switch.js'
import FastTextArea from './form/tools/text-area.js'
import FastTextHidden from './form/tools/text-hidden.js'
import FastTextInput from './form/tools/text-input.js'
import FastTextPassword from './form/tools/text-password.js'
import FastCheckbox from './form/tools/checkbox.js'
import FastButton from './form/tools/button.js'

// 布局组件
import { border, fit } from './layout/index.js'

export default {
  install (Vue, { list = [] }) {
    // 现在没有写代码，等待后期整套框架写完后应该是需要这么一个初始化接口的
    // list 指定哪些组件加载，不指定则加载全部
    Vue.component('fast-Color', FastColor)
    Vue.component('fast-ComboBox', FastComboBox)
    Vue.component('fast-DatePicker', FastDatePicker)
    Vue.component('fast-DateTimePicker', FastDateTimePicker)
    Vue.component('fast-InputNumber', FastInputNumber)
    Vue.component('fast-Label', FastLabel)
    Vue.component('fast-Radio', FastRadio)
    Vue.component('fast-Switch', FastSwitch)
    Vue.component('fast-TextArea', FastTextArea)
    Vue.component('fast-TextHidden', FastTextHidden)
    Vue.component('fast-TextInput', FastTextInput)
    Vue.component('fast-TextPassword', FastTextPassword)
    Vue.component('fast-Checkbox', FastCheckbox)
    Vue.component('fast-Button', FastButton)

    // 布局组件
    Vue.component('fast-border', border)
    Vue.component('fast-fit', fit)
  }
}
