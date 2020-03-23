// @ts-nocheck
/**
 * @desc fastElementUI 框架插件初始化入口
 */
import _merge from 'lodash/merge'
// Form表单子控件
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

// 数据表格组件
import FastGrid from './grid/index.js'

// 面板
import FastPanel from './panel/index.js'

export default {
  /**
   *
   * @param {Object} Vue
   * @param {*} param1
   * globalOptions 框架全局配置对象
   */
  install (Vue, { list = [], globalOptions = {} }) {
    // 表单组件
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

    // 面板
    Vue.component('fast-panel', FastPanel)

    // 数据表格组件
    Vue.component('fast-grid', FastGrid)

    // 全局配置参数
    const defaultGlobalOptions = {
      grid: {
        page: 'page',
        size: 'size',
        total: 'total',
        data: 'data'
      }
    }
    Object.defineProperty(Vue.prototype, '$fast-global-options', {
      value: _merge({}, defaultGlobalOptions, globalOptions)
    })
  }
}
