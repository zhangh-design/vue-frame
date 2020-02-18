## Button 输入框

#### 说明
Button（Button 按钮）扩展至饿了么 ‘Button 按钮’。
[el-button 官方文档](https://element.eleme.cn/#/zh-CN/component/button)

#### 用法

```
import FastButton from '../common/form/tools/button.js'
components: {
  FastButton
}
```

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-button
      text="提交"
      type="primary"
      icon="el-icon-edit"
      icon-position="right"
      :loading="loading"
      :is-display="isDisplay"
      @click="clickHandler"
    />
  </div>
</template>

<script>
import FastButton from '../common/form/tools/button.js'
export default {
  components: {
    FastButton
  },
  data () {
    return {
      isDisplay: true,
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 3000);
  },
  methods: {
    clickHandler (event) {
      console.info(event);
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

```
{name: 'submit-btn', type: 'Button', width: 150, text: '提交', type: 'primary', icon: "el-icon-edit", 'icon-position': 'right', listeners: {
    click: (event) => {
        console.info('按钮点击事件：', event)
    }
}}
```

#### 使用表单组件（对象写法在模板中的使用）

```
<template>
  <div>
    <fast-button
      text="提交"
      type="primary"
      icon="el-icon-edit"
      icon-position="right"
      :loading="loading"
      :is-display="isDisplay"
      :listeners="listeners"
    />
  </div>
</template>

<script>
import FastButton from '../common/form/tools/button.js'
export default {
  components: {
    FastButton
  },
  data () {
    return {
      width: 150,
      isDisplay: true,
      loading: true,
      // 主要是 listeners 对象的使用 ，其它参数没有区别
      listeners: {
        click: () => {
          console.info(event);
        }
      }
    }
  }
}
</script>

<style></style>

```

#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [Button Attributes](https://element.eleme.cn/#/zh-CN/component/button)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
text | — | String |  —  | 按钮文字
width | — | Number |  —  | 组件宽度，不传递则自动适用父元素
height | — | Number |  40 | 组件高度
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象
iconPosition | — | String |  left | 按钮图标位置  'left/right'

#### listeners

事件 | 说明 | 返回值 | 示例
---|---|---|---
click | 按钮点击事件 | (event: Event) | listeners: {click: (event)=>{}}

#### 注意：

在模板`template`中使用时如果同时传入`click`和`listeners: {click: ()=>{}}`那这样的话起作用的是`listeners`对象中配置的`click`事件属性。


