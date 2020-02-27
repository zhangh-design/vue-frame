<template>
  <div>
    <el-row
      v-for="(row, index) in rowsData"
      :key="index"
      :gutter="gutter"
    >
      <el-col
        v-for="col in row"
        :key="col.name"
        :span="(baseSpanNum/columns)*col.span"
      >
        <el-form-item
          :label="col.label+colonText"
          :prop="col.name"
          :label-width="col.labelWidth"
          :required="col.required"
          :rules="col.rules"
          :error="col.error"
          :show-message="col.showMessage"
          :inline-message="col.inlineMessage"
          :size="col.size"
        >
          <template
            v-slot:label
            v-if="col.hasOwnProperty('labelHtml')"
          >
            <label
              v-html="col.labelHtml+colonText"
            />
          </template>
          <component
            v-model="model[col.name]"
            :is="getComponent(col.type)"
            v-bind="getComponentProps(col)"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _omit from 'lodash/omit'

export default {
  props: {
    colon: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Number,
      default: 4
    },
    border: {
      type: Boolean,
      default: true
    },
    detail: {
      type: Array,
      default () {
        return []
      }
    },
    model: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    this.desc = '表单布局，是一种专门用于管理表单中输入字段的布局'
    this.baseSpanNum = 24
    this.gutter = 10
    return {}
  },
  computed: {
    colonText () {
      return this.colon ? '：' : '';
    },
    rowsData () {
      const rows = []
      for (let n = 0, length = this.detail.length; n < length; n++) {
        let row = [this.detail[n]]
        let b = parseInt(this.detail[n].span)
        if (b >= this.columns) {
          // (b > this.columns) && (this.detail[m].span = b - this.columns);
          rows.push(row)
          continue
        }
        for (let m = n + 1, length = this.detail.length; m < length; m++) {
          b = b + parseInt(this.detail[m].span)
          row.push(this.detail[m])
          if (b >= this.columns) {
            // (b > this.columns) && (this.detail[m].span = b - this.columns);
            n = m;
            break
          }
        }
        rows.push(row)
        if (row.length === length || row[row.length - 1]['name'] === this.detail[this.detail.length - 1]['name']) {
          break;
        }
      }
      return rows
    }
  },
  methods: {
    /**
     * @desc 获取指定的全局表单控件
     * @param {String} type - form表单控件类型
     * @method
     * @returns {string} - 控件名称
     * @example
     * getComponent('TextInput')
     */
    getComponent (type) {
      return `fast-${type}`
    },
    /**
     * @desc 获取控件的 props 参数
     * @param {Object} col - 表单详情列信息
     * @method
     * @returns {Object} - props参数对象
     * @example
     * { span: 2, name: 'part', value: this.val, label: '活动', type: 'TextInput', emptyText: '活动' }
     */
    getComponentProps (col) {
      return _omit(col, ['value', 'span', 'name', 'label', 'type', 'labelHtml', 'rules', 'labelWidth', 'required', 'error', 'showMessage', 'inlineMessage', 'size', 'show-message', 'inline-message'])
    }
  }
}
</script>

<style>

</style>
