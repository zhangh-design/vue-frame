## DateTimePicker 日期时间选择器

#### 说明
DateTimePicker（DateTimePicker 日期时间选择器）扩展至饿了么 ‘ DatePicker 日期选择器’。
[DateTimePicker 官方文档](https://element.eleme.cn/#/zh-CN/component/datetime-picker)

#### 依赖关系
- [ DatePicker](https://github.com/zhangh-design/vue-frame/tree/master/document/form/tools/DatePicker)

#### 用法

```
import FastDateTimePicker from '../common/form/tools/date-time-picker.js'
components: {
  FastDateTimePicker
}
```

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-date-time-picker
      :value="value"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      :type="type"
      :align="align"
      :is-render="isRender"
      :listeners="listeners"
    />
  </div>
</template>

<script>
import FastDateTimePicker from '../common/form/tools/date-time-picker.js'
export default {
  components: {
    FastDateTimePicker
  },
  data () {
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
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'startTime', type: 'DateTimePicker', label: '开始时间',
editable: false,placeholder: '请选择开始时间',
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
      :is-render="isRender"
      @dateChange="dateChangeEvent"
      :listeners="listeners"
    />
  </div>
</template>

<script>
import FastDateTimePicker from '../common/form/tools/date-time-picker.js'
export default {
  components: {
    FastDateTimePicker
  },
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
      }
    }
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
    }
  }
}
</script>

<style></style>
```



#### 单项数据流（props）
（请打开 依赖关系 中的 DatePicker 控件进行查看）

#### listeners
（请打开 依赖关系 中的 DatePicker 控件进行查看）

#### 对外方法（method）
（请打开 依赖关系 中的 DatePicker 控件进行查看）

#### 注意：

- `DateTimePicker`和`DatePicker`控件在参数和事件上基本是一样的。

区别：

`DateTimePicker`控件的`type`参数默认是`datetime`。

`DateTimePicker`控件的`format`参数默认是`yyyy-MM-dd HH:mm:ss`。

`DatePicker`控件的`type`参数默认是`date`。

`DatePicker`控件的`format`参数默认是`yyyy-MM-dd`。
