<template>
  <div class="g2-grid-container">
    <fast-g2-grid
      ref="fastG2Grid-ref"
      north-height="260px"
      v-model="activeName"
      type="border-card"
      @tabClick="onTabClick"
    >
      <template
        v-slot:mainGrid
      >
        <child9 ref="child8-grid" />
      </template>
      <template v-slot:tabs>
        <tabs>
          <tab
            label="项目管理"
            name="first"
          >
            <child10
              ref="child10"
              v-if="true"
            />
          </tab>
          <tab
            label="用户管理"
            name="fourth"
          >
            <fast-grid
              ref="user-manager-grid-ref"
              :is-show-index="true"
              :select-mode="false"
              :is-show-pagination="true"
              :is-reload-grid="false"
              :border="false"
              :api="api"
              :columns="columns"
              :table-attributes="tableAttributes"
              :pagination-attributes="paginationAttributes"
              :dialog-visible.sync="dialogVisible"
            />
          </tab>
        </tabs>
      </template>
    </fast-g2-grid>
  </div>
</template>

<script>
import child9 from './child9.vue'
import child10 from './child10.vue'
import _debounce from 'lodash/debounce'

export default {
  provide () {
    return {
      getTestG2Grid: this
    }
  },
  components: {
    child9,
    child10
  },
  data () {
    return {
      activeName: 'first',
      api: 'dept/readDeptPage',
      columns: [
        { name: 'rid', label: '编号' },
        { name: 'name', label: '名称' }
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
  created () {
    // 防抖动
    this.debouncedGetAnswer = _debounce(this.load, 500)
  },
  methods: {
    loadChild (row) {
      this.debouncedGetAnswer(row)
    },
    load (row) {
      if (this.activeName === 'first') {
        this.$refs.child10.$refs['project-grid-ref'].setQueryParams({
          user_id: row.rid
        })
        this.$refs.child10.$refs['project-grid-ref'].reloadGrid()
      }
      if (this.activeName === 'fourth') {
        this.$refs['user-manager-grid-ref'].setQueryParams({ code: row.code })
        this.$refs['user-manager-grid-ref'].reloadGrid()
      }
    },
    onTabClick (tab) {
      const row = this.$refs['child8-grid'].$refs['fast-grid'].getSelected();
      this.loadChild(row)
    }
  }
}
</script>

<style>
.g2-grid-container {
  height: 100%;
  /* height: 500px; */
  /* background-color: pink; */
}
/* .fast-g2-grid .el-tabs {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.fast-g2-grid .el-tabs .el-tabs__content{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0px;
}
.fast-g2-grid .el-tabs .el-tabs__content .el-tab-pane{
  display: flex;
  flex-grow: 1;
  height: 100%;
} */
</style>
