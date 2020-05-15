## FastDoubleWingLayout 表单布局

#### 说明
FastDoubleWingLayout（双飞翼布局）


#### 用法

示例显示效果图：

![image](./1.jpg)

#### 单项数据流（props）

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
border | — | String | null | 边框 '1px blue solid'


#### 实例：

```
<template>
  <div style="height: 50px;">
    <fast-double-wing-layout :border="border">
      <template v-slot:left>
        <div style="padding: 10px;">
          左侧
        </div>
      </template>
      <template v-slot:middle>
        <div>
          中间
        </div>
      </template>
      <template v-slot:right>
        <div>
          右侧-用户名-登出
        </div>
      </template>
    </fast-double-wing-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      border: '1px solid blue'
    }
  }
}
</script>

<style>

</style>

```



