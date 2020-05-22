<template>
  <fast-grid
    ref="fast-grid"
    :is-show-index="true"
    :select-mode="false"
    :is-show-pagination="true"
    :api="api"
    :border="false"
    :columns="columns"
    :table-attributes="tableAttributes"
    :pagination-attributes="paginationAttributes"
    :dialog-visible.sync="dialogVisible"
    @onChangeRowEvent="onChangeRowEvent"
  />
</template>

<script>
export default {
  inject: ['getTestG2Grid'],
  data () {
    return {
      api: 'user/readPage',
      columns: [
        {
          name: 'code',
          label: '编号',
          sortable: true,
          render: (h, row, key, index) => {
            // 必须返回一个 h() 也就是返回一个虚拟节点
            // row[key] 列的值
            return h('i', { class: { 'el-icon-eleme': true } }, row[key])
          },
          renderHeader: (h, column, $index) => {
            return h('i', { class: { 'el-icon-star-on': true } }, column.label)
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
        { name: 'position', label: '位置' }
      ],
      tableAttributes: {
        fit: true,
        size: 'small',
        border: true
        // height: '164px'
      },
      paginationAttributes: {
        currentPage: 1,
        pageSize: 3,
        pageSizes: [3, 6, 8, 12]
      },
      dialogVisible: false
    }
  },
  methods: {
    onChangeRowEvent (row) {
      this.getTestG2Grid.loadChild(row)
    }
  }
}
</script>

<style>
</style>
