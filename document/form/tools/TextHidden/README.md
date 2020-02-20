## TextHidden 密码输入框

#### 说明
TextHidden（TextHidden 密码输入框）扩展至饿了么 ‘Input 按钮’。
[el-input 官方文档](https://element.eleme.cn/#/zh-CN/component/input)

#### 依赖关系
- [Input](https://github.com/zhangh-design/vue-frame/tree/master/document/form/tools/Input)

#### 用法

```
import FastTextHidden from '../common/form/tools/text-hidden.js'
components: {
  FastTextHidden
}
```

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-text-hidden
        :value="value"
      />
  </div>
</template>

<script>
import FastTextHidden from '../common/form/tools/text-hidden.js'
export default {
  components: {
    FastTextHidden
  },
  data () {
    return {
      value: '1001'
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'project-id', type: 'TextHidden', width: 100}
```

#### 单项数据流（props）
（请打开 依赖关系 中的 Input 控件进行查看）

#### listeners
（请打开 依赖关系 中的 Input 控件进行查看）

#### 注意：

- `TextHidden`控件和`TextInput`控件的属性和事件基本都是一样的（`type`属性不一样，密码控件是`hidden`）。
- 隐藏域控件一般是存放 例如：id的值用于表单的获取的，所以事件和插槽这些没有在示例中体现。
