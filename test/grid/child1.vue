<template>
  <div style="height: 500px;">
    <fast-grid
      ref="fast-grid"
      :is-show-index="true"
      :select-mode="false"
      :is-show-pagination="true"
      :api="api"
      :columns="columns"
      :table-attributes="tableAttributes"
      :pagination-attributes="paginationAttributes"
      @onLoadSuccess="onLoadSuccess"
      @onLoadError="onLoadError"
      @onBeforeLoad="onBeforeLoad"
      @onChangeRowEvent="onChangeRowEvent"
      @header-click="onHeaderClick"
    >
      <!-- 查询栏 -->
      <template
        v-slot:search
        v-if="false"
      >
        <search-panel />
      </template>
      <template v-slot:searchScope="row">
        <search-panel :row="row" />
      </template>
      <!-- 工具栏 -->
      <template
        v-slot:tbar
        v-if="false"
      >
        <span>工具栏</span>
      </template>
      <template v-slot:tbarScope="row">
        <tbar-panel :row="row" />
      </template>
      <!-- 详情面板 -->
      <template v-slot:detail>
        <span>详情面板</span>
      </template>
    </fast-grid>
    <p />
    <button @click="getSelections">
      获取多选行
    </button>&nbsp;&nbsp;
    <button @click="selectRow">
      选中单选行
    </button>&nbsp;&nbsp;
    <button @click="selectRows">
      选中多选行
    </button>
  </div>
</template>

<script>
// import FastGrid from '../common/grid/index.js'
import searchPanel from './search.vue'
import tbarPanel from './tbar.vue'

export default {
  components: {
    // FastGrid
    searchPanel,
    tbarPanel
  },
  data () {
    this.api = 'user/readPage'
    this.queryParams = { name: 'zhangsan' }
    this.columns = [
      {
        name: 'code',
        label: '编号',
        sortable: true,
        render: (h, row, key, index) => {
          // 必须返回一个 h() 也就是返回一个虚拟节点
          // row[key] 列的值
          return h('i', { class: { 'el-icon-time': 'el-icon-time' } }, row[key])
        },
        renderHeader: (h, column, $index) => {
          return h(
            'i',
            { class: { 'el-icon-time': 'el-icon-time' } },
            column.label
          )
        },
        filters: [
          { text: '1001', value: '1001' },
          { text: '1020', value: '1020' }
        ]
      },
      { name: 'name', label: '名称' },
      { name: 'username', label: '用户名' },
      { name: 'dept', label: '部门' },
      { name: 'role', label: '角色' },
      { name: 'position', label: '位置' },
      {
        label: '操作',
        fixed: 'right',
        slotNode: [
          {
            render: h => {
              return h(
                'el-button',
                {
                  props: { type: 'text', size: 'size' },
                  on: { click: () => {} }
                },
                ['查看']
              )
            }
          },
          {
            render: h => {
              return h('el-button', { props: { type: 'text', size: 'size' } }, [
                '编辑'
              ])
            }
          }
        ]
      }
    ]
    this.tableAttributes = {
      /* Table Attributes 原生属性 */
      fit: true,
      size: 'small',
      border: true,
      /* 自定义扩展后的属性 */
      slotNode: {
        append: h => {
          return h('span', '插入至表格最后一行之后的内容')
        }
      }
    }
    this.paginationAttributes = {
      /* Pagination Attributes 原生属性 */
      currentPage: 1,
      pageSize: 3,
      pageSizes: [3, 6, 8, 12],
      /* 自定义扩展后的属性 */
      // layout: 'prev, pager, next, jumper, sizes, ->, total',
      pagingItems: [
        {
          text: '提交',
          listeners: {
            click: () => {
              console.info('提交')
            }
          }
        },
        {
          text: '分析',
          icon: 'el-icon-pie-chart',
          listeners: {
            click: () => {
              console.info('分析')
            }
          }
        }
      ]
    }
    this.menu = [
      {
        text: '分析',
        listeners: {
          click: event => {
            console.info('分析')
          }
        }
      },
      {
        text: '同步',
        listeners: {
          click: event => {
            console.info('同步')
          }
        }
      }
    ]
    return {}
  },
  created () {},
  methods: {
    onLoadSuccess (data) {
      console.info('onLoadSuccess ', data)
    },
    onLoadError () {
      console.error('数据加载异常')
    },
    onBeforeLoad () {
      // 返回false表示不会进行查询操作
      return true
    },
    onChangeRowEvent (row) {
      // 单选
      console.log('选中行 ', row)
    },
    getSelections () {
      const rows = this.$refs['fast-grid'].getSelections()
      console.info('多选行 ', rows)
    },
    onHeaderClick (column, event) {
      console.info('列的表头被点击', column)
    },
    selectRow () {
      const b = { field: 'rid', value: 2 }
      this.$refs['fast-grid'].selectRow(b)
    },
    selectRows () {
      const b = [
        { field: 'rid', value: 2 },
        { field: 'rid', value: 3 }
      ]
      this.$refs['fast-grid'].selectRows(b)
    }
  }
}
</script>

<style></style>
