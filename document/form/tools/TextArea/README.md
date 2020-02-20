## TextArea 文本域输入控件

#### 说明
TextArea（TextArea 文本域输入控件）扩展至饿了么 ‘Input 按钮’。
[el-input 官方文档](https://element.eleme.cn/#/zh-CN/component/input)

#### 依赖关系
- [Input](https://github.com/zhangh-design/vue-frame/tree/master/document/form/tools/Input)

#### 用法

```
import FastTextArea from '../common/form/tools/text-area.js'
components: {
  FastTextArea
}
```

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-text-area
        :value="value"
        :rows="rows"
        @focus="focusEvent"
      />
  </div>
</template>

<script>
import FastTextArea from '../common/form/tools/text-area.js'
export default {
  components: {
    FastTextArea
  },
  data () {
    return {
      value: `hello input-${Math.ceil(Math.random() * 1000)}`,
      rows: 5
    }
  },
  methods: {
    focusEvent (event) {
      // 获取焦点
      console.info(event);
    }  
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'project-context', type: 'TextArea', rows: 5, label: '描述',
/*slotNode: {
	prepend: {
    template: '<a>名称：</a>'
  }
}*/,
listeners: {
    inputChange: (value) => {
        console.info('textArea 值发生改变时触发：', value)
    }
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips: `listeners`属性的使用

```
<template>
  <div>
    <fast-text-area
        :value="value"
        :rows="rows"
        :listeners="listeners"
      />
  </div>
</template>

<script>
import FastTextArea from '../common/form/tools/text-area.js'
export default {
  components: {
    FastTextArea
  },
  data () {
    this.listeners = {
      inputChange: this.inputChangeHandler
    }
    return {
      value: `hello input-${Math.ceil(Math.random() * 1000)}`,
      rows: 5
    }
  },
  methods: {
      inputChangeHandler (value) {
      // v-mode 事件
      console.info('textArea 值发生改变时触发：', value)
    }
  }
}
</script>

<style></style>

```

#### 单项数据流（props）
（请打开 依赖关系 中的 Input 控件进行查看）

#### listeners
（请打开 依赖关系 中的 Input 控件进行查看）

#### 注意：

（因为 `textArea` 文本域控件比较特殊，一些 `Input` 文本框控件中的属性不能在 `textArea` 中使用）

比如：

- TextArea 不支持`Input Slots`设置，即：
  
```
<fast-text-area
    :value="value"
    :rows="rows"
    disabled
>
    <!--不支持-->
    <template v-slot:prepend>
        <em>描述：</em>
    </template>
</fast-text-area>
```

- TextArea 不支持 `clearable` 清空属性。
