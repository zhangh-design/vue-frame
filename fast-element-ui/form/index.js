// @ts-nocheck
/**
 * @desc form 表单组件，默认 table 布局
 */
import _set from 'lodash/set'
import _isEqual from 'lodash/isEqual'
import _omit from 'lodash/omit'
import formLayout from '../layout/form.vue'
import { Form } from 'element-ui'

const FastForm = {
  inheritAttrs: false,
  props: {
    ...Form.props,
    // 是否需要在 label 文字后面自动添加冒号`：`
    colon: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Number,
      default: 2
    },
    buttonPosition: {
      type: String,
      default: 'bottom',
      validator (value) {
        return ['top', 'bottom'].includes(value)
      }
    },
    button: {
      type: Array,
      default () {
        return []
      }
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
   * @desc 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
   * @method
   */
    resetFields () {
      this.$refs[`${this._uid}-el-form-ref`].resetFields()
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
            'button',
            'buttonPosition',
            'detail',
            'isRender',
            'isDisplay'
          ])
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
