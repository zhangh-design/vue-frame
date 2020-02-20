## Input 输入框

#### 说明
TextInput（input输入框控件）扩展至饿了么 ‘Input 输入框’。
[el-input 官方文档](https://element.eleme.cn/#/zh-CN/component/input)

#### 用法

```
import FastTextInput from '../common/form/tools/text-input.js'
components: {
  FastTextInput
}
```

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <p>text-field 组件</p>
    <fast-text-input ref="el-input-ref" v-model="value" :width="width" label="用户名" placeholder="请输入用户名" clearable @focus="focusHandler" @clear="clearHandler" @change="changeHandler">
      <!--插槽 slot-->
      <template v-slot:prepend>
        <em>用户名：</em>
      </template>
    </fast-text-input>
    <br/>
    <p>Input Methods</p>
    <button @click="_focus">设置焦点</button>&nbsp;
    <button @click="_blur">失去焦点</button>&nbsp;
    <button @click="_select">选中文字</button>
  </div>
</template>

<script>
import FastTextInput from '../common/form/tools/text-input.js'
export default {
  components: {
    FastTextInput
  },
  data () {
    return {
      value: 'hello input',
      width: 300
    }
  },
  methods: {
    focusHandler (event) {
      console.info('获取焦点事件触发：', event)
    },
    blurHandler (event) {
      console.info('失去焦点时触发：', event)
    },
    changeHandler (value) {
      console.info('仅在输入框失去焦点或用户按下回车时触发：', value)
    },
    clearHandler () {
      console.info('在点击由 clearable 属性生成的清空按钮时触发')
    },
    inputChangeHandler (value) {
      // v-mode 事件
      console.info('input 值发生改变时触发：', value)
    },
    _focus () {
      this.$refs['el-input-ref'].focus()
    },
    _blur () {
      this.$refs['el-input-ref'].blur()
    },
    _select () {
      this.$refs['el-input-ref'].select()
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效。

```
{name: 'project-name', type: 'TextInput', width: 350, label: '项目名称', readonly: true,
/*slotNode: {
	prepend: {
    template: '<a>名称：</a>'
  }
}*/,
listeners: {
    change: (value) => {
        console.info('仅在输入框失去焦点或用户按下回车时触发：', value)
    }
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`slotNode`和`listeners`属性的使用。

```
<template>
  <div>
    <p>text-field 组件</p>
    <fast-text-input ref="el-input-ref" :isRender="isRender" :value="value" :width="width" label="用户名" placeholder="请输入用户名" clearable :slotNode="slotNode" :listeners="listeners">
      <!-- slot 可以使用 template 定义，也可以使用 slotNode 属性传递 -->
      <!-- 如果 template 节点和 slotNode 属性都定义了同一个 slot 那么以 template 定义的起效 -->
      <!-- 如果 template 节点 和 slotNode 属性都没有定义，那么使用 label 属性作为 v-slot:prepend 来渲染-->
    </fast-text-input>
    <br/>
    <p>Input Methods</p>
    <button @click="_focus">设置焦点</button>&nbsp;
    <button @click="_blur">失去焦点</button>&nbsp;
    <button @click="_select">选中文字</button>
  </div>
</template>

<script>
import FastTextInput from '../common/form/tools/text-input.js'
export default {
  components: {
    FastTextInput
  },
  data () {
    // slots
    this.slotNode = {
      prepend: {
        template: '<a>名称：</a>'
      }
      /* append: {
        template: '<a>后缀</a>'
      } */
    }
    // listeners
    this.listeners = {
      focus: this.focusHandler,
      blur: this.blurHandler,
      change: this.changeHandler,
      clear: this.clearHandler,
      // v-model 由 listeners 对象传递 inputChange 属性
      inputChange: this.inputChangeHandler
    }
    return {
      value: 'hello input',
      width: 300,
      // v-if 在对象写法下的实现
      isRender: true
      // v-show 在对象写法下的实现
      // isDisplay: true
    }
  },
  methods: {
    focusHandler (event) {
      console.info('获取焦点事件触发：', event)
    },
    blurHandler (event) {
      console.info('失去焦点时触发：', event)
    },
    changeHandler (value) {
      console.info('仅在输入框失去焦点或用户按下回车时触发：', value)
    },
    clearHandler () {
      console.info('在点击由 clearable 属性生成的清空按钮时触发')
    },
    inputChangeHandler (value) {
      // v-mode 事件
      console.info('input 值发生改变时触发：', value)
    },
    _focus () {
      this.$refs['el-input-ref'].focus()
    },
    _blur () {
      this.$refs['el-input-ref'].blur()
    },
    _select () {
      this.$refs['el-input-ref'].select()
    }
  }
}
</script>

<style></style>

```

#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [Input Attributes](https://element.eleme.cn/#/zh-CN/component/input)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
width | — | Number |  —  | 组件宽度，不传递则自动适用父元素
height | — | Number |  40 | 组件高度
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
slotType | — | String |  prepend | 组件 `slot` 显示位置和`label`结合使用，可选值有： ['prefix', 'suffix', 'prepend', 'append']
slotNode | — | Object |  {} | 组件 `slot` 对象
listeners | — | Object |  {} | 组件事件对象

#### listeners

事件 | 说明 | 返回值 | 示例
---|---|---|---
blur | 在 Input 失去焦点时触发 | (event: Event) | listeners: {blur: (event)=>{}}
focus | 在 Input 获得焦点时触发 | (event: Event) | listeners: {focus: (event)=>{}}
change | 仅在输入框失去焦点或用户按下回车时触发 | 	(value: string \| number) | listeners: {change: (text)=>{}}
clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | — | listeners: {clear: ()=>{}}
input | 在 Input 值改变时触发 | (value: string \| number) | listeners: {change: (text)=>{}}

#### slotNode

名称 | 说明 | 示例
---|---|---
prefix | 输入框头部内容，只对 type="text" 有效 | slotNode: {prefix: {template: '\<a> 模板内容 \</a>'}}
suffix | 输入框尾部内容，只对 type="text" 有效 | slotNode: {suffix: {template: '\<a> 模板内容 \</a>'}}
prepend | 输入框前置内容，只对 type="text" 有效 | slotNode: {prepend: {template: '\<a> 模板内容 \</a>'}}
append | 输入框后置内容，只对 type="text" 有效 | slotNode: {append: {template: '\<a> 模板内容 \</a>'}}

#### 对外方法（method）

[Input Methods](https://element.eleme.cn/#/zh-CN/component/input)


#### 注意：

slotType 属性只有在①和②都没有定义的时候才会起作用。

```
<fast-input label="用户名" slotType="prepend"></fast-input>
```

①不起作用（设置了 slotNode 属性）：

```
<fast-input label="用户名" slotType="prepend" :slotNode="slotNode"></fast-input>
<script>
  export default {
    data(){
        return {
            slotNode: {
              prepend: {
                template: '<a>名称：</a>'
              }  
            }
        }
    }
  }
</script>
```


②不起作用（增加了 template 子节点）：

```
<fast-input label="用户名" slotType="prepend">
    <template v-slot:prepend>
        <em>用户名：</em>
    </template>
</fast-input>
```
