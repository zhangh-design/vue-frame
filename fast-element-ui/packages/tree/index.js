// @ts-nocheck
/**
 * @desc  tree 树状组件
 */
import { devConsole } from '../helper/util.js'
import _assign from 'lodash/assign'
import _get from 'lodash/get'
import _set from 'lodash/set'
import _isEqual from 'lodash/isEqual'
import _omit from 'lodash/omit'
import _has from 'lodash/has'

const FastTree = {
  name: 'FastTree',
  inheritAttrs: false,
  model: {
    prop: 'treeValue',
    event: 'treeChange'
  },
  props: {
    props: {
      type: Object,
      default () {
        return {
          children: 'children',
          label: 'label',
          value: 'value',
          isLeaf: 'leaf'
        }
      }
    },
    // 显示字段
    displayField: {
      type: String,
      default: 'name'
    },
    // 值字段
    valueField: {
      type: String,
      default: 'id'
    },
    // 默认树组件懒加载
    lazy: {
      type: Boolean,
      default: true
    },
    api: {
      type: String,
      required: true
    },
    queryParams: {
      type: Object,
      default () {
        return {}
      }
    },
    // 根节点label
    rootLabel: {
      type: String,
      default: '根目录'
    },
    // 根节点信息
    root: {
      type: Object,
      default () {
        return { id: 0, label: this.rootLabel, children: [] }
      }
    },
    // 推荐 id 作为唯一键
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 过滤返回数据（该函数带一个参数'data'用来指向源数据）
    loadFilter: {
      type: Function
    },
    ctStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    ctCls: {
      type: Object,
      default () {
        return {}
      }
    },
    isRender: {
      type: Boolean,
      default: true
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    listeners: {
      type: Object,
      default: () => {}
    },
    // 定义外部 v-model 值，默认值 null 因为单选传入 String ，多选 Array 并不确定
    treeValue: {
      default () {
        return null
      }
    }
  },
  data () {
    this.events = {
      afterLoadStore: 'afterLoadStore' // 数据加载完成之后
    }
    this.curQueryParams = {}
    return {}
  },
  mounted () {},
  methods: {
    /**
     * @typedef {Object} options - 选项配置对象
     * @property {Number} id - 指定在延迟开始前调用
     * @property {String} text - 节点文本
     * @property {String} label - 节点名称
     * @property {Boolean} isLeaf - 是否子节点
     * @property {Object} data - 后端提供的节点源数据对象
     */
    /**
     * @desc 加载子树数据的方法，仅当 lazy 属性为true 时生效
     * @param {options} node - 节点信息
     * @param {Promise} resolve - promise.resolve
     * @method
     */
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([this.root])
      }
      this.loadStore(node)
        .then(data => {
          resolve(data)
          // 数据读取完成触发事件
          this.$emit(this.events.afterLoadStore, data)
        })
        .catch(() => resolve([]))
    },
    /**
     * @desc 加载树
     * @param {Object} node - 树的节点
     * @method
     */
    loadStore (node = {}) {
      return new Promise((resolve, reject) => {
        if (!this.api) {
          return
        }
        console.info('node', node)
        const params = _assign(
          {},
          this.queryParams,
          { [this.nodeKey]: _get(node, `data.${[this.nodeKey]}`) },
          this.curQueryParams
        )
        console.info('params', params)
        this.$api[this.api]({ params: params })
          .then(resList => {
            if (this.loadFilter) {
              resList = this.loadFilter(resList)
            }
            const resData = []
            for (let i = 0; i < resList.data.length; i++) {
              const element = resList.data[i]
              element[this.props.label] = element[this.displayField]
              element[this.props.value] = element[this.valueField]
              element.nodeIndex = i
              element.superIndex = i
              // element.leaf = true
              resData.push(element)
            }
            console.info('resData ', resData)
            setTimeout(() => {
              // 默认勾选的节点 Array
            }, 0)
            resolve(resData)
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    },
    /**
     * @desc 设置查询参数
     * @param {Object} params
     * @method
     */
    setQueryParams (params = {}) {
      this.curQueryParams = {}
      return Object.assign(this.curQueryParams, params)
    },
    /**
     * @desc 获取 el-tree 对象
     * @method
     */
    getTree () {
      return this.$refs[`${this._uid}-el-tree-ref`]
    },
    /**
     * @desc 若节点可被选择,则返回目前被选中的节点所组成的数组
     * @method
     */
    getCheckedNodes () {
      return this.getTree().getCheckedNodes()
    },
    /**
     * @desc 节点被点击时的回调
     * @param {Object} record
     * @param {*} node
     * @param {*} tree
     */
    nodeClick (record, node, tree) {
      if (_has(this.listeners, 'nodeClick')) {
        this.listeners.nodeClick(record, node, tree)
        return
      }
      this.$emit('nodeClick', record, node, tree)
    }
  },
  render (h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h()
    }
    const style = _assign({}, _get(this.$props, 'ctStyle', { width: '100%' }))
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none')
    }
    return h(
      'el-tree',
      {
        ref: `${this._uid}-el-tree-ref`,
        class: _get(this.$props, 'ctCls', {}),
        style,
        props: _assign(
          {},
          {
            load: this.loadNode,
            props: _omit(this.props, ['value']),
            lazy: this.lazy,
            'expand-on-click-node': false,
            'node-key': this.nodeKey
          },
          this.$attrs
        ),
        on: _assign({}, this.$listeners, { 'node-click': this.nodeClick })
      },
      []
    )
  }
}
FastTree.install = function (Vue) {
  // 用于按需加载的时候独立使用
  devConsole(FastTree.name + '----install----')
  Vue.component(FastTree.name, FastTree)
}
export default FastTree
