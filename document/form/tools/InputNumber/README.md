## InputNumber 计数器

#### 说明
InputNumber（InputNumber 计数器）扩展至饿了么 ‘InputNumber 计数器’。
[InputNumber 官方文档](https://element.eleme.cn/#/zh-CN/component/input-number)


#### 用法

全局组件 `fast-input-number`

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-input-number
      ref="el-input-number-ref"
      v-model="value"
      :min="min"
      :size="size"
      :width="width"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      @change="changeEvent"
    />
    <p>{{ value }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>&nbsp;&nbsp;
    <button @click="_focus">
      设置焦点
    </button>
  </div>
</template>

<script>

export default {
  data () {
		this.ctCls = {
      'fast-input-number': true
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    this.width = '200px'
    return {
      value: 10,
      min: 0,
      size: 'mini'
    }
  },
  methods: {
    changeEvent (value) {
      // 绑定值被改变时触发
      console.info(value)
    },
    _doChangeValue () {
      this.value = 2
    },
    _focus () {
      this.$refs['el-input-number-ref'].focus()
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'num',value: 10,label: '统计',type: 'InputNumber',width: 170,ctStyle: {'background-color': 'red'},ctCls: {'fast-input-number': true},listeners: {
    change: (value)=>{}
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`listeners`属性的使用。

```
<template>
  <div>
    <fast-input-number
      ref="el-input-number-ref"
      v-model="value"
      :min="min"
      :size="size"
      :width="width"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :listeners="listeners"
    />
    <p>{{ value }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>&nbsp;&nbsp;
    <button @click="_focus">
      设置焦点
    </button>
  </div>
</template>

<script>

export default {
  data () {
    this.listeners = {
      change: (value) => {
        // 绑定值被改变时触发
        console.info(value)
      }
    }
		this.ctCls = {
      'fast-input-number': true
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    this.width = '200px'
    return {
      value: 10,
      min: 0,
      size: 'mini'
    }
  },
  methods: {
    _doChangeValue () {
      this.value = 2
    },
    _focus () {
      this.$refs['el-input-number-ref'].focus()
    }
  }
}
</script>

<style></style>

```



#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [InputNumber Attributes](https://element.eleme.cn/#/zh-CN/component/input-number#attributes)

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
change | 当绑定值变化时触发的事件 | (value: Number) | listeners: {change: (value)=>{}}
blur | 在 Input 失去焦点时触发 | (event: Event) | listeners: {blur: (event)=>{}}
focus | 在 Input 获得焦点时触发 | (event: Event) | listeners: {focus: (event)=>{}}

#### 对外方法（method）
[InputNumber Methods](https://element.eleme.cn/#/zh-CN/component/input-number#methods)

#### 注意：

- listeners 事件对象如果传入了事件那么对应的`v-on`绑定的事件调用函数将不会触发。

```
<fast-input-number
      @change="changeEvent"
      :listeners="listeners"
    />
data () {
    this.listeners = {
      change: (value) => {
        // 触发
        console.info(value);
      }
    }
    return {

    }
},
methods: {
    changeEvent (value) {
        // 不处触发
        // 因为 listeners 中也传递了 change 事件所以 v-on 绑定的事件不触发
    }
}
```
