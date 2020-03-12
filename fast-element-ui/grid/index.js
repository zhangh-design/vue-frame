/**
 * grid 列表组件
 * 全局组件
 */
import FastTable from './table/index.js'
import FastGridSearch from './search/index.js'
import FastGridPagination from './pagination/index.js'
import _isEqual from 'lodash/isEqual'
import _has from 'lodash/has'
import _set from 'lodash/set'

const FastGrid = {
  provide () {
    return {
      getFastGrid: this
    }
  },
  components: {
    FastTable,
    FastGridSearch,
    FastGridPagination
  },
  props: {
    api: {
      type: String,
      default: '',
      required: false
    },
    queryParams: {
      type: Object,
      default () {
        return {}
      }
    },
    // 列 el-table-column 的配置
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    // 查询栏详情配置
    searchDetail: {
      type: Array,
      default () {
        return []
      }
    },
    // 工具栏详情配置
    tBarDetail: {
      type: Array,
      default () {
        return []
      }
    },
    // Table Attributes
    tableAttributes: {
      type: Object,
      default () {
        return {}
      }
    },
    // Pagination Attributes
    paginationAttributes: {
      type: Object,
      default () {
        return {}
      }
    },
    // 右键菜单栏 contextMenu
    menu: {
      type: Array,
      default () {
        return []
      }
    },
    // 默认选择第一行
    isSelectedFirstRow: {
      type: Boolean,
      default: true
    },
    // 第一次载入时是否自动刷新列表数据
    isReloadGrid: {
      type: Boolean,
      default: true
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
    this.layout = 'border' // 布局
    this.fastGridTable = null // table 组件实例
    this.pageSize = 30 // 每页显示条目个数
    this.currentPage = 1 // 当前页数
    this.events = {
      afterDataLoad: 'afterDataLoad' // 数据加载完成之后
    }
    return {
      total: 0 // 总条目数
    }
  },
  watch: {
    paginationAttributes: {
      handler (val) {
        if (_has(val, 'pageSize')) {
          this.pageSize = val.pageSize
        }
        if (_has(val, 'currentPage')) {
          this.currentPage = val.currentPage
        }
      },
      immediate: true
    }
  },
  created () {
    /* setTimeout(() => {
      this.total = 100
    }, 2000); */
  },
  methods: {
    /** Table 表格组件 */
    /**
     * @desc 设置表格的总数量
     * @param {Number} num=0 - 数量
     */
    setTotal (num = 0) {
      this.total = num
    },
    /**
     * @desc 设置 FastGridTable 组件实例
     * @method
     * @param {Object} tableInstance - 组件实例对象 this
     */
    setTableEl (tableInstance) {
      this.fastGridTable = tableInstance
    },
    /**
     * @desc 获取 FastGridTable 组件实例
     * @method
     * @returns {Object} FastGridTable组件的实例对象 this
     */
    getTable () {
      return this.fastGridTable
    },
    /**
     * @desc 获取 el-table 组件实例（用于直接操作 element-ui的el-table组件的方法）
     * @method
     * @returns {Object} el-table组件
     */
    getElTable () {
      return this.fastGridTable.getEl()
    },
    /**
     * @desc 获取查询总数
     * @method
     * @returns {Number} 总数
     */
    getTotal () {
      return this.total
    },
    /**
     * @desc 获取总页数
     * @method
     * @returns {Number} 总页数
     */
    getTotalPages () {
      return Math.ceil(this.total / this.pageSize)
    },
    /**
     * @desc 清空表格
     * @method
     */
    clearGrid () {
      this.total = 0
      this.getTable().clearTable()
    },
    /**
     * @desc 设置查询参数
     * @param {Object} params - 查询对象参数
     */
    setQueryParams (params = {}) {
      this.getTable().setQueryParams(params)
    },
    /**
     * @desc 刷新table组件，会回到第一页
     * @method
     */
    reloadGrid () {
      this.getTable().setQueryParams({})
      this.getTable().loadData()
    },
    /**
     * @desc 刷新table组件，保留在当前页
     * @method
     */
    loadGrid () {
      this.getTable().loadData()
    },
    /** Pagination 分页组件 */
    /**
     * @desc pageSize 改变时会触发
     * @param {number} pageSize - 每页条数
     * @method
     */
    onSizeChange (pageSize) {
      console.info('pageSize 改变时会触发 ', pageSize)
      this.pageSize = pageSize
      if (this.currentPage === 1 || this.currentPage * pageSize <= this.total) {
        this.loadGrid()
      } else {
        this.currentPage = 1
      }
    },
    /**
     * @desc currentPage 改变时会触发
     * @param {number} page - 当前页
     * @method
     */
    onCurrentChange (page) {
      console.info('currentPage：', page)
      this.currentPage = page
      this.loadGrid()
    },
    /**
     * @desc 数据加载完成
     * @param {Array} table
     */
    afterDataLoad (table) {
      this.$emit(this.events.afterDataLoad, table)
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
      'fast-border',
      {
        ref: `${this._uid}-fast-grid`,
        props: {
          border: true
        }
      },
      [
        h(
          FastGridSearch,
          {
            slot: 'north',
            props: { detail: this.searchDetail }
          },
          [h('template', { slot: 'default' }, this.$slots.search)]
        ),
        h(FastTable, {
          slot: 'center',
          props: {
            api: this.api,
            queryParams: this.queryParams,
            columns: this.columns,
            isReloadGrid: this.isReloadGrid,
            isSelectedFirstRow: this.isSelectedFirstRow,
            ...this.tableAttributes
          }
        }),
        h(FastGridPagination, {
          slot: 'south',
          props: {
            ...this.paginationAttributes,
            total: this.total
          }
        })
      ]
    )
  }
}
export default FastGrid
