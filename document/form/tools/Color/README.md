## ColorPicker 颜色选择器

#### 说明
ColorPicker（ColorPicker 颜色选择器）扩展至饿了么 ‘ColorPicker 颜色选择器’。
[ColorPicker 官方文档](https://element.eleme.cn/#/zh-CN/component/color-picker)


#### 用法

全局组件 `fast-color`

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-color
      v-model="color"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      @change="changeEvent"
      @active-change="activeChange"
    />
    <p>{{ color }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>
  </div>
</template>

<script>
export default {
  data () {
    this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-color': true
    }
    return {
      color: '#68BE8E'
    }
  },
  mounted () {},
  methods: {
    _doChangeValue () {
      this.color = '#EB4D25'
    },
    changeEvent (value) {
      console.info('change：', value);
    },
    activeChange (value) {
      console.info('active-change', value);
    }
  }
}
</script>

<style></style>


```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'user-color',value: '#4A8AF4',label: '主题',type: 'Color',width: 170,ctStyle: {'background-color': 'red'},ctCls: {'fast-color': true},listeners: {
    change: (value)=>{}
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`listeners`属性的使用。

```
<template>
  <div>
    <fast-color
      v-model="color"
      :listeners="listeners"
    />
    <p>{{ color }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>
  </div>
</template>

<script>

export default {
  data () {
    this.listeners = {
      change: this.changeEvent,
      'active-change': this.activeChange
    }
    return {
      color: '#68BE8E'
    }
  },
  mounted () {},
  methods: {
    _doChangeValue () {
      this.color = '#EB4D25'
    },
    changeEvent (value) {
      console.info('change：', value);
    },
    activeChange (value) {
      console.info('active-change', value);
    }
  }
}
</script>

<style></style>


```



#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [Attributes](https://element.eleme.cn/#/zh-CN/component/color-picker#attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
ctStyle | — | Object |   | 一个可选添加的Style内联样式类，加入到组件的元素上
ctCls | — | Object |   | 一个可选添加的CSS样式类，加入到组件的元素上
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象

#### listeners
事件 | 说明 | 返回值 | 示例
---|---|---|---
change | 当绑定值变化时触发 | (value: String) | listeners: {change: (value)=>{}}
active-change | 面板中当前显示的颜色发生改变时触发 | (event: String) | listeners: {'active-change': (event)=>{}}

#### 对外方法（method）
无

#### 注意：

- listeners 事件对象如果传入了事件那么对应的`v-on`绑定的事件调用函数将不会触发，两种事件定义方式只能取一种或者两种之间不能冲突。

```
<fast-input-number
      @change="changeEvent"
      @active-change="activeChange"
      :listeners="listeners"
    />
data () {
    this.listeners = {
      change: (value) => {
        // 触发
        console.info(value);
      },
      'active-change': (value)=>{
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
        // 因为 listeners 中也传递了 change 事件所以 v-on 绑定的事件触发
    },
    activeChange (value) {
      //不处触发
    }
}
```
