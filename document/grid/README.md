## Grid 数据表格

#### 说明
Grid（Grid 数据表格）扩展至饿了么 ‘Table 表格’和‘Pagination 分页’。

[->Table 表格](https://element.eleme.cn/#/zh-CN/component/table)

[->Pagination 分页](https://element.eleme.cn/#/zh-CN/component/pagination)

#### 依赖的第三方组件库：

用于数据请求，用这个插件可以定义`ajax`请求的静态模型即可非常方便。

[npm->axios-api-query](https://www.npmjs.com/package/axios-api-query)

[github->axios-api-query](https://github.com/zhangh-design/js-libs/tree/master/axios-api-query)

```
cnpm install axios-api-query --save
```

#### 用法

```
// 全局组件
<fast-grid />
```

#### 使用表单组件

请求的数据返回结构：

```
{
	"total": 1,
	"data": [
		{
			"rid": 16,
			"code": "1010",
			"name": "小明",
			"username": "xm",
			"password": "123456",
			"dept": null,
			"role": null,
			"position": null,
			"flag": 1
		}
	],
	"success": true
}
```

```
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
      获取单选行
    </button>&nbsp;&nbsp;
    <button @click="selectRows">
      获取多选行
    </button>
  </div>
</template>

<script>
import searchPanel from './search.vue'
import tbarPanel from './tbar.vue'

export default {
  components: {
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

```


#### 单项数据流 FastGrid（props）

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
api | 是 | String |  | 服务器访问模块地址（需要引入自定义的ajax请求插件）
queryParams | — | Object | {} | 初始化查询参数（每次查询都会带上这个参数）
loadFilter | — | Function |  | 返回过滤数据显示。（请看附录2）
columns | 是 | Array | [] | 列的配置（请看附录1）
tableAttributes | — | Object |  | [->Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) （请看附录3）
paginationAttributes | — | Object |  | [->Pagination  Attributes](https://element.eleme.cn/#/zh-CN/component/pagination#attributes) （请看附录4）
menu | — | Array |  | 行右键点击显示菜单栏的配置对象（请看附录5）
selectMode | — | Boolean | false | 多选（会显示`checkbox`列）
isShowIndex | — | Boolean | false | 显示`index`下标列
isSelectedFirstRow | — | Boolean | true | 默认选择第一行
isReloadGrid | — | Boolean | true | 第一次载入时是否自动刷新列表数据
isShowPagination | — | Boolean | true | 显示分页数量选择器
isRender | — | Boolean | true | 渲染组件（v-if）
isDisplay | — | Boolean | true | 显示组件（v-show）

#### Grid Events
注意：这里只展示了自定义扩展后的 事件，Grid控件的原生事件继承于`Table Events`例如：`select`、`row-dblclick`等，更多原生事件请查看 [->
Table Events](https://element.eleme.cn/#/zh-CN/component/table#table-events)
事件名 | 说明 | 参数
---|---|---
onLoadSuccess | 在数据加载成功的时候触发 | data
onLoadError | 在载入远程数据产生错误的时候触发 | none
onBeforeLoad | 在载入请求数据之前触发，如果返回false可终止载入数据操作（比如：验证参数不满足条件） | none
onChangeRowEvent | 选中行事件 | row

#### Grid Methods
注意：这里的 `methods` 是扩展后的方法，如果需要调用原生[Table Methods](https://element.eleme.cn/#/zh-CN/component/table#table-methods)
可以使用`getElTable`方法返回`el-table`实例对象在调用`element-ui`中`Table 表格`组件中的`methods`。

方法名 | 说明 | 参数 | 类型
---|---|---|---
setQueryParams | 设置查询参数（在reloadGrid和loadGrid调用之前需要先设置） | params | Object
getElTable | 获取 el-table 组件实例（用于直接操作 element-ui的el-table组件的方法） |  |  |
getTotal | 获取查询总数 |  |
getTotalPages | 获取总页数 |  |
getData | 返回加载完毕后的数据（当前页） |  |
getSelected | 返回单选选中的行-单选 |  |
getSelections | 返回复选时所有被选中的行-多选 |  |
selectRow | 选中一行（请看附录6） | row | Object
selectRows | 选择多行（请看附录6） | rows | Array
selectAll | 选择当前页中所有的行 |  |
clearSelections | 用于多选表格，清空用户的选择 |  |
clearGrid | 清空表格 |  |
reloadGrid | 刷新Grid组件，会回到第一页 |  |
loadGrid | 刷新table组件，保留在当前页 |  |

#### Grid Slot

name | 说明
---|---
search | 查询栏 位于表格数据的上面
tbar | 工具栏 位于查询栏下面和数据表格上面
detail | 双击详情页插槽，会以`el-dialog`弹框的形式展示

#### Grid Scoped Slot

name | 参数 | 说明
---|---|---
searchScope | row | 查询栏 位于表格数据的上面
tbarScope | row | 工具栏 位于查询栏下面和数据表格上面
detailScope | row | 双击详情页插槽，会以`el-dialog`弹框的形式展示

#### 单项数据流 tableAttributes（props）
注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 [->Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
ctStyle | — | Object |   | 一个可选添加的Style内联样式类，加入到组件的元素上
ctCls | — | Object |   | 一个可选添加的CSS样式类，加入到组件的元素上
slotNode | — | Object |   | 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。`）（请看附录3）

#### 单项数据流 paginationAttributes（props）
注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 [->Pagination Attributes](https://element.eleme.cn/#/zh-CN/component/pagination#attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
layout | — | String | prev, pager, next, jumper, sizes, slot, ->, total | 组件布局，子组件名用逗号分隔（原生的属性，这里只是把默认值修改了）
pagingItems | — | Array | | 可拓展按钮 （必须要在 `layout` 参数中设置`slot`值，Grid控件默认已经设置`slot`）（请看附录4）

#### 右键菜单栏 menuAttributes（props）

注意：`menu`中默认使用的子控件是`fast-Button`控件。

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
text | — | String |   | 显示的标题（不支持HTML格式）
listeners | — | Object | | 事件定义 （请看附录5）

#### 附录：

**1.**

`columns`

扩展至饿了么 ‘Table-column 表格列’

[->Table-column 表格列](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)

示例：

```
this.columns = [
  {
    name: 'code',
    label: '编号',
    sortable: true, // el-table 表格原生属性
    size: 'small', // el-table 表格原生属性
    stripe: true, // el-table 表格原生属性
    render: (h, row, key, index) => {
      // 必须返回一个 h() 也就是返回一个虚拟节点
      // row[key] 列的值
      return h('i', { 'class': { 'el-icon-time': 'el-icon-time' } }, row[key])
    },
    renderHeader: (h, column, $index) => {
      return h('i', { 'class': { 'el-icon-time': 'el-icon-time' } }, column.label)
    },
    filters: [{ text: '1001', value: '1001' }, { text: '1020', value: '1020' }]
  }
]
```

##### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看[
->Table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
name | 是 | String |  | 对应查询返回数据中的键名①
render |  | Function(h, row, key, index) |  | 自定义列的扩展内容②
renderHeader |  | Function(h, column, $index) |  | 自定义表头的扩展内容③
filters |  | Array[{ text, value }] |  | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。④
slotNode |  | Array |  | 自定义列的内容（比如：单独会有一列`查看`和`删除`的列）⑤

①

```
// 假设返回的数据集
tableData: [
 {
  rid: 1
  code: "1001"
  name: "小红"
  username: "wuhan"
  password: "123456"
  dept: null
  role: null
  position: null
  flag: 1
 }
]

// name的定义
this.columns = [{name: 'code'},{name: 'name'},{name: 'username'}]
```

②

```
this.columns = [
  {
    name: 'code',
    label: '编号',
    sortable: true,
    render: (h, row, key, index) => {
      // 必须返回一个 h() 也就是返回一个虚拟节点
      // row[key] 列的值
      return h('i', { 'class': { 'el-icon-time': 'el-icon-time' } }, row[key])
    }
  }
]
```


③

```
this.columns = [
  {
    name: 'code',
    label: '编号',
    sortable: true,
    renderHeader: (h, column, $index) => {
      // 设置 表头 的扩展内容
      // 必须返回一个 h() 也就是返回一个虚拟节点
      // column.label 显示的标题值
      return h('i', { 'class': { 'el-icon-time': 'el-icon-time' } }, column.label)
    }
  }
]
```

④

注意：数据过滤只能过滤当前页的数据也就是静态过滤，如果需要改变默认的搜索行为需要在设置`filter-method`参数。

```
this.columns = [
  {
    name: 'code',
    label: '编号',
    sortable: true,
    filters: [{ text: '1001', value: '1001' }, { text: '1020', value: '1020' }],
    /*'filter-method'(value, row, column) {
        // 自定义搜索行为
        const property = column['property']
        return row[property] === value
    }*/
  }
]
```

⑤

```
this.columns = [
  {
    label: '操作',
    fixed: 'right',
    slotNode: [
      {
        // 只能设置一个 render 参数并返回一个虚拟节点
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
```


**2.**

 该函数带一个参数'data'用来指向源数据（即：获取的数据源，比如Json对象）。你可以改变源数据的标准数据格式。这个函数必须返回包含'total'和'size'属性的标准数据对象或者是你在`$fast-global-options`全局变量中设置的`total`和`size`的别名。

```
<fast-grid
  ref="fast-grid"
  :is-show-index="true"
  :select-mode="true"
  :api="api"
  :load-filter="loadFilter"
  :columns="columns"
  :table-attributes="tableAttributes"
/>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    loadFilter (data) {
      // 这里可以处理自己的其它逻辑
      return data
    }
  }
}
</script>
```

**3.**

`tableAttributes`

继承至饿了么 ‘Table Attributes’

[->Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)

示例：

```
this.tableAttributes = {
  /*Table Attributes 原生属性*/
  fit: true,
  size: 'small',
  border: true,
  // highlightCurrentRow: true,
  /*自定义扩展后的属性*/
  slotNode: {
    append: (h) => {
      // 必须返回一个虚拟节点
      return h('span', '插入至表格最后一行之后的内容')
    }
  },
  ctStyle: { color: '#1CA362' },
  ctCls: {
    isActive: true,
    hasError: false
  }
}
```

**4.**

`paginationAttributes`

扩展至饿了么 ‘Pagination 分页’

[->Pagination Attributes](https://element.eleme.cn/#/zh-CN/component/pagination#attributes)

示例：

```
this.paginationAttributes = {
  /*Pagination Attributes 原生属性*/
  currentPage: 3,
  pageSize: 3,
  pageSizes: [3, 6, 8, 12],
  /*自定义扩展后的属性*/
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
```

**5.**

`menu`

默认生成的控件是`fast-button`，`fast-button`只有`click`一个事件。

示例：

```
data(){
    this.menu = [
      { text: '分析', listeners: { click: (event) => { console.info('分析'); } } },
      { text: '同步', listeners: { click: (event) => { console.info('同步'); } } }
    ]
    return{
        // 响应式数据
    }
}
```

**6.**

`selectRow` 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。

参数 | 说明
---|---
field | 字段key，对于列的`name`属性
value | 字段值，列的真实值

示例：

```
methods: {
    selectRow () {
      // 选中条件是 id等于2的行设置选中效果
      const b = { field: 'id', value: 2 }
      this.$refs['fast-grid'].selectRow(b)
    }
}
```

`selectRows` 设置多选行

参数 | 说明
---|---
field | 字段key，对于列的`name`属性
value | 字段值，列的真实值

示例：

```
methods: {
    selectRows () {
      // 选中条件是 id等于2和4的行设置选中效果
      const b = [
        { field: 'id', value: 2 },
        { field: 'id', value: 4 }
      ]
      this.$refs['fast-grid'].selectRows(b)
    }
}
```
