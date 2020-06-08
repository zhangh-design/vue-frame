<template>
  <div>
    <fast-combo-box-input
      display-field="label"
      v-model="defaultValue"
      :api="api"
      :query-params="queryParams"
      width="170px"
      size="mini"
      :load-filter="loadFilter"
      :disabled="false"
      :ct-cls="ctCls"
      :ct-style="ctStyle"
      :readonly="false"
      :options="options"
    />
    {{ defaultValue }}
  </div>
</template>

<script>
export default {
  data () {
    this.api = 'project/readProjectComboBox'
    this.ctCls = {
      bbbb: true
    }
    this.ctStyle = {
      color: 'yellow'
    }
    this.options = [
      { label: '苹果' },
      { label: '香梨' },
      { label: '西瓜' },
      { label: '桃子' },
      { label: '猕猴桃' }
    ]
    return {
      defaultValue: '西瓜', // 默认选择值
      queryParams: { params: { code: '1001' } }
    }
  },
  methods: {
    loadFilter (resData) {
      // 数据过滤
      const options = []
      for (let i = 0, length = resData.data.length; i < length; i++) {
        options.push({ label: resData.data[i].name })
      }
      return options
    }
  }
}
</script>

<style>

</style>
