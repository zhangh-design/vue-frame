// @ts-nocheck
/**
 * Select 下拉 grid 选择器
 */
import { devConsole } from '../helper/util.js'
import _assign from 'lodash/assign'
import _includes from 'lodash/includes'

const FastComboGrid = {
  name: 'FastComboGrid',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'comboGridChange'
  },
  props: {
    // 输入框宽度
    width: {
      type: String,
      default: '160px'
    },
    // grid 面板宽度
    gridWidth: {
      type: String,
      default: '470px'
    },
    emptyText: {
      type: String,
      default: '请选择'
    },
    api: {
      type: String,
      default: ''
    },
    queryParams: {
      type: Object,
      default () {
        return {}
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: [String, Array],
      default () {
        return []
      }
    },
    // 数据过滤函数
    loadFilter: {
      type: Function
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    // 多选时将选项合并为一段文字
    collapseTags: {
      type: Boolean,
      default: true
    },
    // Select 组件头部内容
    prefixLabel: String,
    // 显示字段 可通过props修改
    displayField: {
      type: String,
      default: 'name'
    },
    // 真实值
    valueField: {
      type: String,
      default: 'id'
    },
    // 外部事件扩展 只有 'change' 选中值发生改变事件
    listeners: {
      type: Object,
      default () {
        return {}
      }
    },
    ctStyle: {
      type: Object
    },
    ctCls: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    isRender: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      curSelectValue: '',
      curSelectValues: []
    }
  },
  methods: {
    /**
     * @desc 创建 grid 列表节点
     */
    createTreeNode () {
      return this.$createElement(
        'fast-grid',
        {
          class: 'combogrid-panel-content-cls',
          ref: `${this._uid}-fast-grid-ref`,
          attrs: {},
          props: {
            api: this.api,
            // 初始化查询参数
            queryParams: this.queryParams,
            columns: this.columns,
            selectMode: !!this.multiple,
            isReloadGrid: true,
            isSelectedFirstRow: false,
            loadFilter: this.loadFilter,
            tableAttributes: {
              size: 'mini',
              border: true
            },
            paginationAttributes: {
              layout: 'prev, pager, next, ->, total',
              pageSize: 8,
              pageSizes: [8, 10, 15, 20]
            }
          },
          on: {
            'row-click': (row, column, event) => {
              // 单选，没有复选框
              if (!this.multiple) {
                this.curSelectValue = row[this.displayField]
                this.$emit('comboGridChange', row[this.valueField])
              }
              event.stopPropagation() // js 阻止事件冒泡
            },
            select: (selection, row) => {
              // 当用户手动勾选数据行的 Checkbox 时触发的事件
              const values = _assign([], this.value)
              const displayValues = _assign([], this.curSelectValues)
              for (let i = 0, length = selection.length; i < length; i++) {
                if (!_includes(values, selection[i][this.valueField])) {
                  values.push(selection[i][this.valueField])
                  displayValues.push(selection[i][this.displayField])
                }
              }
              if (_includes(this.value, row[this.valueField])) {
                // 取消选中
                const index = this.value.findIndex(
                  val => val === row[this.valueField]
                )
                if (index !== -1) {
                  values.splice(index, 1)
                  displayValues.splice(index, 1)
                }
              }
              this.curSelectValues = displayValues
              this.$emit('comboGridChange', values)
            },
            'select-all': selection => {
              // 当用户手动勾选全选 Checkbox 时触发的事件
              const values = []
              const displayValues = []
              for (let i = 0, length = selection.length; i < length; i++) {
                values.push(selection[i][this.valueField])
                displayValues.push(selection[i][this.displayField])
              }
              this.curSelectValues = displayValues
              this.$emit('comboGridChange', values)
            },
            onLoadSuccess: this.afterDataLoadHandler
          }
        }
      )
    },
    afterDataLoadHandler () {
      // 翻页时如果当前页有要选中的行那么设置选中效果
      setTimeout(() => {
        const selectRows = []
        for (let i = 0, length = this.value.length; i < length; i++) {
          selectRows.push({ field: this.valueField, value: this.value[i] })
        }
        this.$refs[`${this._uid}-fast-grid-ref`].selectRows(selectRows)
      }, 0)
    },
    /**
     * @desc 获取 grid 对象
     */
    getGrid () {
      return this.$refs[`${this._uid}-fast-grid-ref`]
    }
  },
  render (h) {
    // v-if
    if (!this.isRender) {
      return h()
    }
    // const style = { ...this.$props.ctStyle, width: this.width }
    const style = _assign({}, this.$props.ctStyle, { width: this.width })
    // v-show
    if (!this.isDisplay) {
      style.display = 'none'
    }
    const elOptions = []
    // 构造默认的下拉选择项 option
    elOptions.push(
      [{ value: '', label: '' }].map(option => {
        return h(
          'el-option',
          {
            class: 'fast-combogrid-panel-cls',
            style: {
              width: this.gridWidth,
              height: '212px',
              'background-color': '#fff',
              padding: '0px'
              // overflow: 'hidden'
            },
            props: {
              key: option.value,
              label: option.label,
              value: option.value
            }
          },
          [this.createTreeNode()]
        )
      })[0]
    )
    // Select 组件头部内容
    if (this.prefixLabel) {
      elOptions.push(
        h(
          'span',
          { style: { lineHeight: '32px' }, slot: 'prefix' },
          this.prefixLabel
        )
      )
    }
    return h(
      'el-select',
      {
        ref: `${this._uid}-fast-combo-grid-ref`,
        class: _assign({}, this.$props.ctCls || {}),
        style: _assign({}, this.$props.ctStyle || {}),
        attrs: {
          placeholder: this.emptyText
        },
        props: {
          value: this.multiple ? this.curSelectValues : this.curSelectValue,
          size: this.size, // 输入框尺寸 默认 'small' string
          disabled: this.disabled, // 设为true整个选择器不可用
          clearable: !this.multiple, // 单选时是否可以清空选项
          multiple: this.multiple, // 设置多选，value 对应为数组
          'collapse-tags': this.collapseTags // 将多选合并为一段文字 默认 false
        },
        on: {
          clear: () => {
            // 单选用户点击清空按钮时触发
            this.curSelectValue = ''
            this.$emit('comboGridChange', '')
          },
          'remove-tag': value => {
            // 多选时移除单个选择项时触发
            const index = this.curSelectValues.findIndex(name => name === value)
            this.curSelectValues.splice(index, 1)
            const removeAfterValue = []
            for (let i = 0, length = this.value.length; i < length; i++) {
              removeAfterValue.push(this.value[i])
            }
            const removeAfterSelectRow = removeAfterValue.splice(index, 1)
            this.$emit('comboGridChange', removeAfterValue)
            this.$refs[`${this._uid}-fast-grid-ref`].selectRows([
              { field: this.valueField, value: removeAfterSelectRow[0] }
            ])
          }
        }
      },
      [this.$slots.search, elOptions]
    )
  }
}
FastComboGrid.install = function (Vue, ELSelect) {
  // 用于按需加载的时候独立使用
  devConsole(FastComboGrid.name + '----install----')
  if (ELSelect) {
    Vue.use(ELSelect)
  }
  Vue.component(FastComboGrid.name, FastComboGrid)
}
export default FastComboGrid
