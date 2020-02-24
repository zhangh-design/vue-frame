## Switch 开关选择按钮

#### 说明
Switch（Switch 开关选择按钮）扩展至饿了么 ‘Switch 开关’。
[Switch 官方文档](https://element.faas.ele.me/#/zh-CN/component/switch)


#### 用法

```
import FastSwitch from '../common/form/tools/switch.js'
components: {
  FastSwitch
}
```

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <!--如果不是 v-model 那么一定要将 switchChange 事件传递进去，并且在 methods 中手动赋值，手动实现 v-model 的功能-->
    <!-- <fast-switch
      :value="value1"
      @switchChange="switchChangeEvent"
      @change="changeEvent"
    /> -->
    <fast-switch
      v-model="value1"
      @change="changeEvent"
    />
    <p>{{ value1 }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>
  </div>
</template>

<script>
import FastColor from '../common/form/tools/color.js'

export default {
  components: {
    FastColor
  },
  data () {
    return {
      value1: true
    }
  },
  mounted () {},
  methods: {
    _doChangeValue () {
      this.value1 = !this.value1
    },
    switchChangeEvent (value) {
      // 手动实现 v-model 赋值的功能，配合 @switchChange 事件使用
      this.value1 = value
    },
    changeEvent (value) {
      console.info('change：', value);
    }
  }
}
</script>

<style></style>


```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'isGo',value: false,label: '即时出发',type: 'Switch',width: 170,listeners: {
    change: (value)=>{}
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`listeners`属性的使用。

```
<template>
  <div>
    <fast-switch
      v-model="value1"
      :listeners="listeners"
    />
    <p>{{ value1 }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>
  </div>
</template>

<script>
import FastColor from '../common/form/tools/color.js'

export default {
  components: {
    FastColor
  },
  data () {
    this.listeners = {
      change: this.changeEvent
    }
    return {
      value1: true
    }
  },
  mounted () {},
  methods: {
    _doChangeValue () {
      this.value1 = !this.value1
    },
    changeEvent (value) {
      console.info('change：', value);
    }
  }
}
</script>

<style></style>


```



#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [Switch 官方文档](https://element.faas.ele.me/#/zh-CN/component/switch)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象

#### listeners
事件 | 说明 | 返回值 | 示例
---|---|---|---
change | switch 状态发生变化时的回调函数 | (value: boolean) | listeners: {change: (value)=>{}}

#### 对外方法（Methods）
[Switch Methods](https://element.faas.ele.me/#/zh-CN/component/switch)

#### 注意：

- listeners 事件对象如果传入了事件那么对应的`v-on`绑定的事件调用函数将不会触发，两种事件定义方式只能取一种或者两种之间不能冲突。

```
<fast-switch
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
