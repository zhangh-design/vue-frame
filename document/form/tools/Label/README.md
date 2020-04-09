## Label 普通文本标签

#### 说明
Label（Label 普通文本标签）。

#### 用法

全局组件 `fast-label`

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-label
      text="介绍"
      :html="html"
      :label-style="labelStyle"
      :is-render="isRender"
      @click="labelClickEvent"
    />
  </div>
</template>

<script>

export default {
  data () {
    return {
      isRender: true,
      labelStyle: {
        color: '#24ABF2',
        'font-size': '14px'
      },
      // 如果同时配置了 text 属性，那么只会显示 html 传入的内容
      html: '<em>介绍</em>'
    }
  },
  methods: {
    labelClickEvent (event) {
      console.info('label Click ', event);
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'project-label', type: 'TextLabel', style: {color: '#24ABF2'},
text: '介绍', listeners: {
    click: (event) => {
        console.info(event);
    }
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`listeners`属性的使用。

```
<template>
  <div>
    <fast-label
      text="介绍"
      :html="html"
      :label-style="labelStyle"
      :is-render="isRender"
      :listeners="listeners"
    />
  </div>
</template>

<script>

export default {
  data () {
    // listeners
    this.listeners = {
        click: this.labelClickEvent
    }
    return {
      isRender: true,
      labelStyle: {
        color: '#24ABF2',
        'font-size': '14px'
      },
      // 如果同时配置了 text 属性，那么只会显示 html 传入的内容
      html: '<em>介绍</em>'
    }
  },
  methods: {
    labelClickEvent (event) {
      console.info('label Click ', event);
    }
  }
}
</script>

<style></style>
```



#### 单项数据流（props）

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
labelStyle | — | Object |  { color: '#3F3F46', 'font-size': '12px' } | style 样式对象
labelClass | — | String |   | 外部传入的 class 类名
text | — | String |   | 显示内容（非HTML）
html | — | String |   | 显示内容（HTML）
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象

#### listeners

事件 | 说明 | 返回值 | 示例
---|---|---|---
click | 点击内容时触发 | (event: Event) | listeners: {click: (event)=>{}}

#### 注意：

- 这个控件是框架自身的并非来源于 elementUI。
