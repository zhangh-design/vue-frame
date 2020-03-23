<template>
  <div class="search-container">
    <span>编号：</span>
    <fast-TextInput
      v-model="curRow.code"
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

<script>
export default {
  inject: ['getFastGrid'],
  props: {
    row: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      curRow: {}
    }
  },
  mounted () {
    this.getFastGrid.$on('onChangeRowEvent', (row) => {
      this.curRow = { ...row }
    })
  },
  computed: {},
  methods: {
    _clickEvent (event) {
      this.getFastGrid.setQueryParams({ code: this.curRow.code })
      this.getFastGrid.reloadGrid()
    }
  }
}
</script>

<style scoped>
.search-container {
  padding: 5px;
  border-bottom: 1px solid #E0E0E0;
}
.fast-button{
  margin-left: 10px;
}
</style>
