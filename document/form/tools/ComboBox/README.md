## ComboBox 选择器

#### 说明
ComboBox（ComboBox 选择器）扩展至饿了么 ‘Select 选择器’。
[Select 官方文档](https://element.faas.ele.me/#/zh-CN/component/select)


#### 用法

```
import FastComboBox from '../common/form/tools/combo-box.js'
components: {
  FastComboBox
}
```

#### 使用表单组件（模板写法）

（静态数据）

```
<template>
  <div>
    <fast-combo-box
      ref="fast-comboBox-ref"
      :value="comboBoxValue"
      :multiple="multiple"
      :display-field="displayField"
      :value-field="valueField"
      :options="options"
      :slot-node="slotNode"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :width="width"
      @selectChange="_selectChangeEvent"
      @remove-tag="removeTagEvent"
      :listeners="listeners"
    />
    <p>{{ comboBoxValue }}</p>
    <div>
      <button @click="doTestResponsiveMode">
        测试响应式
      </button>
      &nbsp;&nbsp;
      <!--远程请求数据时才有效-->
      <button @click="reloadHandler">
        手动刷新
      </button>
    </div>
  </div>
</template>

<script>
import FastComboBox from '../common/form/tools/combo-box.js'

export default {
  components: {
    FastComboBox
  },
  data () {
    // 静态数据-不做响应式监听
    this.options = [{ value: '01', label: '苹果' }, { value: '02', label: '香梨' }, { value: '03', label: '西瓜' }, { value: '04', label: '桃子' }, { value: '05', label: '猕猴桃' }]
    // this.options = []
    // listeners
    this.listeners = {
      change: this.changeEvent
    }
    // slots
    this.slotNode = {
      prefix: {
        template: '<em style="line-height: 40px;">f:</em>'
      },
      empty: {
        template: '<div style="text-align: center;padding: 5px 0 5px 0">没有水果了</div>'
      }
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-combo-box': true
    }
    this.width = '200px'
    return {
      // 静态数据-多选
      multiple: true,
      comboBoxValue: ['03', '04'],
      // 静态数据-单选
      /* multiple: false,
      comboBoxValue: '03', */
      displayField: 'label',
      valueField: 'value'
    }
  },
  methods: {
    changeEvent (item) {
      // 选中值发生变化时触发
      console.info(item);
    },
    _selectChangeEvent (value) {
      // 手动实现 v-model 的赋值
      this.comboBoxValue = value
    },
    doTestResponsiveMode () {
      this.comboBoxValue = ['1']
    },
    reloadHandler () {
      this.$refs['fast-comboBox-ref'].reload()
    },
    removeTagEvent (value) {
      console.info(value);
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（模板写法）

（服务器请求数据）

```
<template>
  <div>
    <fast-combo-box
      ref="fast-comboBox-ref"
      :value="comboBoxValue"
      :multiple="multiple"
      :display-field="displayField"
      :value-field="valueField"
      :api="api"
      :slot-node="slotNode"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :width="width"
      @selectChange="_selectChangeEvent"
      @remove-tag="removeTagEvent"
      :listeners="listeners"
    />
    <p>{{ comboBoxValue }}</p>
    <div>
      <button @click="doTestResponsiveMode">
        测试响应式
      </button>
      &nbsp;&nbsp;
      <!--远程请求数据时才有效-->
      <button @click="reloadHandler">
        手动刷新
      </button>
    </div>
  </div>
</template>

<script>
import FastComboBox from '../common/form/tools/combo-box.js'

export default {
  components: {
    FastComboBox
  },
  data () {
    // listeners
    this.listeners = {
      change: this.changeEvent
    }
    // slots
    this.slotNode = {
      prefix: {
        template: '<em style="line-height: 40px;">f:</em>'
      },
      empty: {
        template: '<div style="text-align: center;padding: 5px 0 5px 0">没有水果了</div>'
      }
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-combo-box': true
    }
    this.width = '200px'
    return {
      // 远程请求数据-多选
      multiple: true,
      comboBoxValue: ['2', '4'],
      api: 'user/getUserInfo',
      queryParams: {},
      displayField: 'label',
      valueField: 'value'
    }
  },
  mounted () {
    /* this.$api['user/getUserInfo']().then((data) => {
      console.info(data);
    }) */
  },
  methods: {
    changeEvent (item) {
      // 选中值发生变化时触发
      console.info(item);
    },
    _selectChangeEvent (value) {
      // 手动实现 v-model 的赋值
      this.comboBoxValue = value
    },
    doTestResponsiveMode () {
      this.comboBoxValue = ['1']
    },
    reloadHandler () {
      this.$refs['fast-comboBox-ref'].reload()
    },
    removeTagEvent (value) {
      console.info(value);
    }
  }
}
</script>

<style></style>

```


#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

（静态数据）

```
{name: 'goods',value: ['02','05'],label: '物品',type: 'ComboBox',width: 170,ctStyle: {'background-color': 'red'},ctCls: {'fast-combo-box': true},multiple: true,displayField:'label',valueField:'value',options: [{value:'01',label:'苹果'},{value:'02',label:'香梨'},{value:'03',label:'西瓜'},{value:'04',label:'桃子'},{value:'05',label:'猕猴桃'}],listeners: {
    change: (value)=>{},
    clear: ()=>{}
}}
```

（服务器端请求）

```
{name: 'goods',value: ['02','05'],label: '物品',ctStyle: {'background-color': 'red'},ctCls: {'fast-combo-box': true}, api: 'user/getUserInfo',queryParams: {id: '1001'},type: 'ComboBox',width: 170,multiple: true,displayField:'label',valueField:'value',listeners: {
    change: (value)=>{},
    clear: ()=>{}
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`listeners`属性的使用。

```
<fast-combo-box
      // ......
      :listeners="listeners"
    />
<script>
import FastComboBox from '../common/form/tools/combo-box.js'

export default {
   components: {
    FastComboBox
  },
  data () {
    this.listeners = {
      change: this.changeEvent,
      'remove-tag': this.removeTagEvent,
      clear: ()=>{}
    }
    return {
          
    }
  },
  methods: {
    changeEvent(item){
        // 选中值发生变化时触发
    },
    removeTagEvent(item){
        // 多选模式下移除tag时触发
    }
  }
    
}
```


#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [Select Attributes](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
api | — | String |  | 服务器访问模块地址（需要引入自定义的ajax请求插件）
queryParams | — | Object | {} | 初始化查询参数
options | — | Array | [] | 静态数据源
width | — | String |  auto | 组件宽度
ctStyle | — | Object |   | 一个可选添加的Style内联样式类，加入到组件的元素上
ctCls | — | Object |   | 一个可选添加的CSS样式类，加入到组件的元素上
loadFilter | — | Function | null | 服务器请求数据处理函数
displayField | — | String | name | 数据源中哪个字段用作显示值
valueField | — | String | id | 数据源中哪个字段用作隐藏值
slotNode | — | Object | {} | 组件 `slot` 对象
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象

#### listeners

[Select Events](https://element.eleme.cn/#/zh-CN/component/select#select-events)

#### 对外方法（Methods）
[Select Methods](https://element.eleme.cn/#/zh-CN/component/select#methods)

方法名 | 说明 | 参数 | 类型
---|---|---|---
reload | 手动执行刷新数据操作 | 查询条件 | {}

#### 注意：

- 如果传入了 `api` 参数，那么同时传入的静态数据源`options`将会无效。
- 如果是单选请设置`multiple: false`默认即单选，单选时传入的默认选中项`value`必须是`String`字符类型，不能是数组类型。

```
// 静态数据-多选
multiple: true,
comboBoxValue: ['03', '04'], // 数组
// 静态数据-单选
multiple: false,
comboBoxValue: '03' // 字符
```

- listeners 事件对象如果传入了事件那么对应的`v-on`绑定的事件调用函数将不会触发，两种事件定义方式只能取一种或者两种之间不能冲突。

```
<fast-combo-box
      @change="changeEvent"
      :listeners="listeners"
    />
data () {
    this.listeners = {
      change: (value) => {
        // 触发
        console.info(value);
      }
    }
    return {
        
    }
},
methods: {
    changeEvent (value) {
        // 不处触发
        // 因为 listeners 中也传递了 change 事件所以 v-on 绑定的事件不触发
    }
}
```
