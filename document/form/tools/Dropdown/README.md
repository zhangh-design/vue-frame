## Dropdown 下拉菜单

#### 说明
Dropdown（Dropdown 下拉菜单）扩展至饿了么 ‘Dropdown 下拉菜单’。
[el-dropdown 官方文档](https://element.eleme.cn/#/zh-CN/component/dropdown)

#### 用法

全局组件`fast-dropdown`

#### （模板写法）

```
<template>
  <div>
    <fast-dropdown
      :title="title"
      :options="options"
      size="medium"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :is-render="isRender"
      :is-display="isDisplay"
      :type="type"
      :split-button="splitButton"
      trigger="click"
      @click="handleClick"
      @command="handleCommand"
      @visible-change="handleVisibleChange"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      ctStyle: {
        fontSize: '30px'
      },
      ctCls: {
        isActive: true,
        hasError: false
      },
      isRender: true,
      isDisplay: true,
      type: 'primary',
      splitButton: true,
      title: '下拉菜单',
      options: [
        { text: '黄金糕', class: 'bbbb', command: '01' },
        { text: '狮子头' },
        { text: '螺蛳粉' },
        { text: '双皮奶', disabled: true },
        { text: '蚵仔煎', divided: true }
      ]
    }
  },
  methods: {
    handleClick (event) {
      console.info('click', event)
    },
    handleCommand (command) {
      console.info('command', command);
    },
    handleVisibleChange (result) {
      console.info('visible-change ', result);
    }
  }
}
</script>

<style></style>

```



#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [Dropdown Attributes](https://element.eleme.cn/#/zh-CN/component/dropdown#dropdown-attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
title | — | String |  | 组件标题
ctStyle | — | Object |   | 一个可选添加的Style内联样式类，加入到组件的元素上
ctCls | — | Object |   | 一个可选添加的CSS样式类，加入到组件的元素上
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
options | — | Object |  {} | 下拉展示的子项

#### [->listeners](https://element.eleme.cn/#/zh-CN/component/dropdown#dropdown-events)
