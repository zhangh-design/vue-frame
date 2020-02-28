// @ts-nocheck
/**
 * @desc form 表单组件，默认 table 布局
 */
import _set from 'lodash/set'
import _isEqual from 'lodash/isEqual'
import _omit from 'lodash/omit'
import _isEmpty from 'lodash/isEmpty'
import formLayout from '../layout/form.vue'
import { Form } from 'element-ui'

const FastForm = {
  inheritAttrs: false,
  props: {
    ...Form.props,
    colon: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Number,
      default: 2
    },
    detail: {
      type: Array,
      default () {
        return []
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
  data () {
    return {}
  },
  methods: {
    /**
     * @desc 任一表单项被校验后触发
     * @event FastForm#_validateEvent
     * @param {String} validatePropName='' - 被校验的表单项 prop 值
     * @param {Boolean} result=false - 校验是否通过
     * @param {String} message=null - 错误消息（如果存在）
     */
    _validateEvent (validatePropName = '', result = false, message = null) {
      this.$emit('validate', validatePropName, result, message)
    },
    /**
     * @desc 对整个表单进行校验的方法
     * @method
     * @param {function} callback=function(){} - 验证成功回调函数
     * @param {function} failCallback=function(){} - 失败回调函数
     */
    validate (callback = function () {}, failCallback = function () {}) {
      this.$refs[`${this._uid}-el-form-ref`].validate(valid => {
        if (valid) {
          // true 验证成功
          callback()
        } else {
          // false 失败
          failCallback()
          return false
        }
      })
    },
    /**
     * @desc 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
     * @method
     */
    resetFields () {
      this.$refs[`${this._uid}-el-form-ref`].resetFields()
    },
    /**
     * @desc 移除表单项的校验结果
     * @method
     * @param {array} validateProps=[] - 传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     */
    clearValidate (validateProps = []) {
      this.$refs[`${this._uid}-el-form-ref`].clearValidate(validateProps)
    },
    /**
     * @desc 对部分表单字段进行校验的方法
     * @method
     * @param {array} validateProps=[] - 传入待验证的表单项的 prop 属性或者 prop 组成的数组
     * @param {function} callback=function(){} - 回调函数
     */
    validateField (validateProps = [], callback = function () {}) {
      if (_isEmpty(validateProps)) {
        return
      }
      this.$refs[`${this._uid}-el-form-ref`].validateField(
        validateProps,
        callback
      )
    },
    /**
     * @desc 获取表单对象
     * @method
     * @return {Object} - el-form 控件表单对象
     */
    getForm () {
      return this.$refs[`${this._uid}-el-form-ref`]
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
    return h(
      'el-form',
      {
        ref: `${this._uid}-el-form-ref`,
        style,
        attrs: this.$attrs,
        props: {
          ..._omit(this.$props, [
            'colon',
            'columns',
            'detail',
            'isRender',
            'isDisplay'
          ])
        },
        on: {
          validate: this._validateEvent
        }
      },
      [
        h(formLayout, {
          props: {
            colon: this.colon,
            columns: this.columns,
            border: this.border,
            detail: this.detail,
            model: this.model
          }
        })
      ]
    )
  }
}
export default FastForm
