## Radio 单选框

#### 说明
Radio（Radio 单选框）扩展至饿了么 ‘Radio 单选框’。
[Radio 官方文档](https://element.eleme.cn/#/zh-CN/component/radio)


#### 用法

全局组件 `fast-radio`

#### 使用表单组件（模板写法）

```
<template>
  <div>
    <fast-radio
      :value="value"
      :options="options"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      @change="changeEvent"
      @radioChange="radioChangeEvent"
      v-if="true"
    />
    <fast-radio
      v-model="value"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :options="options"
      v-if="false"
    />
    <br><br>
    <button @click="bbb">
      测试响应式
    </button>
    &nbsp;&nbsp;
    <button @click="ccc">
      获取值
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
      'fast-radio': true
    }
    return {
      value: '02',
      options: [
        { label: '室内', value: '01' },
        { label: '室外', value: '02', disabled: false }
      ]
    }
  },
  methods: {
    changeEvent (value) {},
    radioChangeEvent (value) {
      console.info(value)
      this.value = value
    },
    bbb () {
      this.value = '01'
    },
    ccc () {
      console.info(this.value);
    }
  }
}
</script>

<style>
.fast-radio{
  border: 1px solid yellow;
}
</style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'foods', type: 'Radio', label: '食物',value: '01',options: [{ label: '苹果', value: '01' },{ label: '香蕉', value: '02', disabled: false },{ label: '梨', value: '03' }],
ctStyle: {'background-color': 'red'}, ctCls: {'fast-radio': true},
listeners: {
    change: (value) => {
        console.info('change ', value)
    }
}}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips：`listeners`属性的使用。

```
<template>
  <div>
    <fast-radio
      :value="value"
      :options="options"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      @change="changeEvent"
      @radioChange="radioChangeEvent"
      :listeners="listeners"
    />
  </div>
</template>

<script>

export default {
  data () {
    this.listeners = {
      change: (value) => {
        console.info(value);
      }
    }
		this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-radio': true
    }
    return {
      value: '02',
      options: [
        { label: '室内', value: '01' },
        { label: '室外', value: '02', disabled: false }
      ]
    }
  },
  mounted () {},
  methods: {
    changeEvent (value) {
      // 会触发 listeners 对象中的 change 函数
      console.info(value);
    },
    radioChangeEvent (value) {
      console.info(value);
      this.value = value
    },
    bbb () {
      this.value = '01'
    },
    ccc () {
      console.info(this.value);
    }
  }
}
</script>

<style>
.fast-radio{
  border: 1px solid yellow;
}
</style>

```



#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [Radio Attributes](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
ctStyle | — | Object |   | 一个可选添加的Style内联样式类，加入到组件的元素上
ctCls | — | Object |   | 一个可选添加的CSS样式类，加入到组件的元素上
options | — | Object |  {}  | 外部传入的子项列表 [{label: '爬山', value: '01'},{label: '美食', value: '02', disabled: false}]
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象

#### listeners
事件 | 说明 | 返回值 | 示例
---|---|---|---
change | 当绑定值变化时触发的事件 | (value: Array) | listeners: {change: (value)=>{}}

#### 对外方法（method）
无

#### 注意：

- options 中子项的参数（`label`、`value`、`disabled`），`value`参数是作为唯一值（id）来使用的是框架自身的属性，详细参数请看到 [Radio Attributes](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
label | Y | String\|Number | | 控件显示值
value | Y | String\|Number | | 控件value
disabled | - | boolean | false | 是否隐藏

- listeners 事件对象如果传入了事件那么对应的`v-on`绑定的事件调用函数将不会触发。

```
<fast-radio
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
        // 因为 listeners 中也传递了 change 事件所以 v-on 绑定的事件触发
    }
}
```

