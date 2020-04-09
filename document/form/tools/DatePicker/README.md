## DatePicker 日期选择器

#### 说明
DatePicker（DatePicker 日期选择器）扩展至饿了么 ‘ DatePicker 日期选择器’。
[date-picker 官方文档](https://element.eleme.cn/#/zh-CN/component/date-picker)

#### 用法

全局组件 `fast-date-picker`

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-date-picker
      :value="value"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      :type="type"
      :align="align"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :width="width"
      :is-render="isRender"
      @dateChange="dateChangeEvent"
    />
  </div>
</template>

<script>

export default {
  data () {
    this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-date-picker': true
    }
    this.width = '200px'
    return {
        value: new Date(),
        editable: false,
        clearable: false,
        size: 'mini',
        placeholder: '请选择',
        type: 'date',
        align: 'right',
        isRender: true
    }
  },
  methods: {
    dateChangeEvent (value) {
      console.info(value);
			this.value=value
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'startDate', type: 'DatePicker', label: '开始日期', width: '200px'
editable: false,placeholder: '请选择开始日期',
ctStyle: {'background-color': 'red'}, ctCls: {'fast-date-picker': true},
listeners: {
    focus: (event) => {
        console.info('focus ', event);
    },
    change: (value) => {
        console.info('change ', value)
    },
    dateChange: (value) => {
        console.info('v-model ', value)
    }
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`listeners`属性的使用。

```
<template>
  <div>
    <fast-date-picker
      :value="value"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      :type="type"
      :align="align"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :width="width"
      :is-render="isRender"
      @dateChange="dateChangeEvent"
      :listeners="listeners"
    />
  </div>
</template>

<script>

export default {
  data () {
    // listeners
    this.listeners = {
      focus: (event) => {
        console.info('focus ', event);
      },
      change: (value) => {
        console.info('bb', value);
      },
      dateChange: (value) => {
        // dateChangeEvent 方法将不会触发，会触发到这里
        console.info('v-model', value);
				this.value=value
      }
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-date-picker': true
    }
    this.width = '200px'
    return {
        value: new Date(),
        editable: false,
        clearable: false,
        size: 'mini',
        placeholder: '请选择',
        type: 'date',
        align: 'right',
        isRender: true
    }
  },
  methods: {
    dateChangeEvent (value) {
      console.info(value);
			this.value=value
    }
  }
}
</script>

<style></style>
```



#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [DatePicker Attributes](https://element.eleme.cn/#/zh-CN/component/date-picker#attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
width | — | String |  auto | 组件宽度
ctStyle | — | Object |   | 一个可选添加的Style内联样式类，加入到组件的元素上
ctCls | — | Object |   | 一个可选添加的CSS样式类，加入到组件的元素上
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象

#### listeners

事件 | 说明 | 返回值 | 示例
---|---|---|---
blur | 在 Input 失去焦点时触发 | (event: Event) | listeners: {blur: (event)=>{}}
focus | 在 Input 获得焦点时触发 | (event: Event) | listeners: {focus: (event)=>{}}
change | 仅在输入框失去焦点或用户按下回车时触发 | 	(value: string \| number) | listeners: {change: (text)=>{}}
dateChange | 仅在输入框失去焦点或用户按下回车时触发（**v-model**） | 	(value: string \| number) | listeners: {dateChange: (text)=>{}}

#### 对外方法（method）

[Input Methods](https://element.eleme.cn/#/zh-CN/component/date-picker#methods)

#### 注意：

- listeners事件中的`dateChange`事件其实是`v-model`。


```
<template>
<div>
    <fast-date-picker v-model="value" />
</div>
<template>

<script>
import FastDatePicker from '../common/form/tools/date-picker.js'
export default {
  components: {
    FastDatePicker
  },
  data () {
      return {
        value: new Date()
      }
  },
  methods: {
    dateChangeEvent (value) {
       // v-model
       console.info(value);
    }
  }
}
</script>
```
