<template>
  <fast-grid
    ref="project-grid-ref"
    :is-show-index="true"
    :select-mode="false"
    :is-show-pagination="true"
    :is-reload-grid="false"
    :border="false"
    :fit="false"
    :api="api"
    :columns="columns"
    :table-attributes="tableAttributes"
    :pagination-attributes="paginationAttributes"
    :dialog-visible.sync="dialogVisible"
  />
</template>

<script>
export default {
  inject: ['getTestG2Grid'],
  data () {
    return {
      api: 'project/readProjectPage',
      columns: [
        { name: 'code', label: '编号' },
        { name: 'name', label: '项目名称' },
        { name: 'flag', label: '状态' },
        { name: 'createtime', label: '创建时间' },
        { name: 'functionary', label: '职位' },
        { name: 'remark', label: '备注' }
      ],
      tableAttributes: {
        fit: true,
        size: 'small',
        border: true
      },
      paginationAttributes: {
        currentPage: 1,
        pageSize: 8,
        pageSizes: [3, 6, 8, 12]
      },
      dialogVisible: false
    }
  },
  methods: {
    onChangeRowEvent (row) {
      console.info('row', row);
    }
  }
}
</script>

<style>

</style>
