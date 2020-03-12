<template>
  <div style="height: 500px;">
    <fast-grid
      ref="fast-grid"
      :api="api"
      :query-params="queryParams"
      :columns="columns"
      :search-detail="this.searchDetail()"
      :table-attributes="tableAttributes"
      :pagination-attributes="paginationAttributes"
      @afterDataLoad="afterDataLoad"
    >
      <template
        v-slot:search
        v-if="false"
      >
        <search-panel />
      </template>
    </fast-grid>
    <p v-if="false" />
    <div v-if="false">
      <button @click="toggleRowSelection">
        多选行
      </button>
      &nbsp;&nbsp;
      <button @click="toggleAllSelection">
        全选/全不选
      </button>
      &nbsp;&nbsp;
      <button @click="setCurrentRow">
        单选行
      </button>
      &nbsp;&nbsp;
      <button @click="getSelectRow">
        获取选中行
      </button>
      &nbsp;&nbsp;
      <button @click="getSelectRows">
        获取选中行集合（多选）
      </button>
    </div>
  </div>
</template>

<script>
import FastGrid from '../common/grid/index.js'
import searchPanel from './search.vue'

export default {
  components: {
    FastGrid,
    searchPanel
  },
  data () {
    this.columns = [
      {
        name: 'code',
        label: '编号',
        sortable: true,
        render: (h, row, key, index) => {
          return h('i', { 'class': { 'el-icon-time': 'el-icon-time' } }, row[key])
        },
        renderHeader: (h, column, $index) => {
          return h('i', { 'class': { 'el-icon-time': 'el-icon-time' } }, column.label)
        },
        filters: [{ text: '1001', value: '1001' }, { text: '1020', value: '1020' }]
        /* 'filter-method' (value, row, column) {
          const property = column['property']
          return row[property] === value
        } */
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
            render: (h) => {
              return h('el-button', { props: { type: 'text', size: 'size' }, on: { click: this._clickEvent } }, ['查看'])
            }
          },
          {
            render: (h) => {
              return h('el-button', { props: { type: 'text', size: 'size' } }, ['编辑'])
            }
          }
        ]
      }
    ]
    this.tableAttributes = {
      selectMode: false,
      fit: true,
      size: 'small',
      border: true,
      isShowIndex: true,
      // highlightCurrentRow: true,
      /* slotNode: {
        append: (h) => {
          return h('span', '插入至表格最后一行之后的内容')
        }
      }, */
      /* listeners: {
        'row-click': (row, column, event) => {
          console.info(row);
        },
        'row-contextmenu': (row, column, event) => {
          console.info(row);
        }
      }, */
      ctStyle: { color: '#1CA362' },
      ctCls: {
        isActive: true,
        hasError: false
      }
    }
    this.paginationAttributes = {
      pageSize: 3,
      pageSizes: [3, 6, 8, 12],
      isShowPagination: true,
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
      // layout: 'prev, pager, next, jumper, sizes, ->, total'
    }
    this.api = 'user/readPage'
    // this.queryParams = { name: 'zhangsan' }
    return {
      queryParams: { name: 'zhangsan' }
    }
  },
  created () {
    /* setTimeout(() => {
      console.info('执行定时器');
      this.queryParams = { age: '10' }
    }, 3000); */
  },
  methods: {
    searchDetail () {
      return [{ label: '名称', type: 'TextInput', placeholder: '请输入名称' }]
    },
    toggleRowSelection () {
      const b = [
        { field: 'id', value: 2 },
        { field: 'id', value: 4 }
      ]
      this.$refs['fast-grid'].getTable().toggleRowSelection(b)
    },
    toggleAllSelection () {
      this.$refs['fast-grid'].getTable().toggleAllSelection()
    },
    setCurrentRow () {
      const b = { field: 'id', value: 2 }
      this.$refs['fast-grid'].getTable().setCurrentRow(b)
    },
    getSelectRow () {
      const row = this.$refs['fast-grid'].getTable().getSelectedRow()
      console.info(row)
    },
    getSelectRows () {
      const rows = this.$refs['fast-grid'].getTable().getSelectedRows()
      console.info(rows)
    },
    afterDataLoad (data) {
      // console.info('数据加载完成', data);
    },
    _clickEvent (event) {
      console.info('查看click ', event);
    }
  }
}
</script>

<style></style>
