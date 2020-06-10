<template>
  <div>
    <fast-combo-grid
      ref="fast-combo-grid"
      v-model="value"
      :api="api"
      :query-params="queryParams"
      :columns="columns"
      :collapse-tags="false"
      :load-filter="loadFilter"
      :multiple="true"
      display-field="name"
      value-field="code"
    >
      <template v-slot:search>
        <div>
          <span style="margin-left: 10px;">编号：</span>
          <fast-TextInput
            v-model="searchValue"
            width="150px"
            size="small"
            placeholder="请输入内容"
          />
          <fast-Button
            :ct-cls="{'fast-button': true}"
            text="查询"
            type="primary"
            size="small"
            @click="_clickEvent"
          />
        </div>
      </template>
    </fast-combo-grid>
    {{ value }}
  </div>
</template>

<script>
export default {
  data () {
    this.api = 'user/readPage'
    this.queryParams = { name: 'zhangsan' }
    this.columns = [
      {
        name: 'code',
        label: '编号',
        sortable: true
      },
      { name: 'name', label: '名称' }
    ]
    return {
      value: [],
      searchValue: '1040'
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    loadFilter (data) {
      // 数据过滤处理
      return data
    },
    _clickEvent () {
      this.$refs['fast-combo-grid'].getGrid().setQueryParams({ code: this.searchValue })
      this.$refs['fast-combo-grid'].getGrid().reloadGrid()
    }
  }
}
</script>

<style>

</style>
<style>
.fast-button{
  margin-left: 10px;
}
</style>
