## TextPassword 密码输入框

#### 说明
TextPassword（TextPassword 密码输入框）扩展至饿了么 ‘Input 按钮’。
[el-input 官方文档](https://element.eleme.cn/#/zh-CN/component/input)

#### 依赖关系
- [Input](https://github.com/zhangh-design/vue-frame/tree/master/document/form/tools/Input)

#### 用法

全局组件 `fast-text-password`

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-text-password
        :value="value"
        clearable
        @inputChange="inputChangeEvent"
      >
        <template v-slot:prepend>
          <em>密码：</em>
        </template>
    </fast-text-password>
  </div>
</template>

<script>

export default {
  data () {
    return {
      value: '123456'
    }
  },
  methods: {
    inputChangeEvent (value) {
      // v-model 值改变时触发
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
{name: 'project-pswd', type: 'TextPassword', width: 350, label: '密码', readonly: true,
/*slotNode: {
	prepend: {
    template: '<a>密码：</a>'
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
    <fast-text-password
        :value="value"
        clearable
        :slotNode="slotNode"
        :listeners="listeners"
      >
    </fast-text-password>
  </div>
</template>

<script>

export default {
  data () {
    // slots
    this.slotNode = {
      prepend: {
        template: '<a>密码：</a>'
      }
    }
    // listeners
    this.listeners = {
      inputChange: this.inputChangeHandler
    }
    return {
      value: `123456`
    }
  },
  methods: {
      inputChangeHandler (value) {
      // v-mode 事件
      console.info('textPassword 值发生改变时触发：', value)
      this.value=value
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

`TextPassword`控件和`TextInput`控件的属性和事件基本都是一样的（`type`属性不一样，密码控件是`password`）。
