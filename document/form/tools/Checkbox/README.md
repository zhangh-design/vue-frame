## Checkbox 多选框

#### 说明
Checkbox（Checkbox 多选框）扩展至饿了么 ‘Checkbox 多选框’。
[Checkbox 官方文档](https://element.eleme.cn/#/zh-CN/component/checkbox)


#### 用法

```
import FastCheckbox from '../common/form/tools/checkbox.js'
components: {
  FastCheckbox
}
```

#### 使用表单组件（模板写法）

```
<template>
  <div>
  <!--change和checkboxChange两个事件都是选中项发生改变时触发可以只选一个接听，或者使用v-model的形式-->
    <fast-checkbox
      :max="checkBox.max"
      :value="checkBox.value"
      :options="checkBox.options"
      @checkboxChange="checkboxChangeEvent"
      v-if="true"
    />
    <!--v-model-->
    <fast-checkbox
      v-model="checkBox.value"
      :options="checkBox.options"
      v-if="false"
    />
    <button @click="bbb">
      测试响应式
    </button>
    <button @click="ccc">
      获取值
    </button>
  </div>
</template>

<script>
import FastCheckbox from '../common/form/tools/checkbox.js'
export default {
  components: {
    FastCheckbox
  },
  data () {
    return {
      checkBox: {
        // 默认选中项
        value: ['02', '01'],
        // 最多勾选两个
        max: 2,
        // el-checkbox 选项
        options: [
          { label: '爬山', value: '01' },
          { label: '美食', value: '02', disabled: false },
          { label: '骑车', value: '03' }
        ]
      }
    }
  },
  methods: {
    changeEvent (value) {
      console.info(value);
    },
    bbb () {
      this.checkBox.value = ['01', '03']
    },
    ccc () {
      console.info(this.checkBox.value);
    },
    checkboxChangeEvent (value) {
      console.info('v-model：', value);
      this.checkBox.value = value
    }
  }
}
</script>

<style></style>

```

#### 使用表单组件（对象写法）

Tips: 对象写法必须在 Form 表单控件中才有效

```
{name: 'foods', type: 'Checkbox', label: '食物',value: ['02','01'],options: [{ label: '苹果', value: '01' },{ label: '香蕉', value: '02', disabled: false },{ label: '梨', value: '03' }],
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
    <fast-checkbox
      :max="checkBox.max"
      :value="checkBox.value"
      :options="checkBox.options"
      @checkboxChange="checkboxChangeEvent"
      :listeners="listeners"
      v-if="true"
    />
    <fast-checkbox
      v-model="checkBox.value"
      :options="checkBox.options"
      v-if="false"
    />
    <button @click="bbb">
      测试响应式
    </button>
    <button @click="ccc">
      获取值
    </button>
  </div>
</template>

<script>
import FastCheckbox from '../common/form/tools/checkbox.js'

export default {
  components: {
    FastCheckbox
  },
  data () {
    this.listeners = {
      change: (value) => {
        console.info(value);
      }
    }
    return {
      checkBox: {
        value: ['02', '01'],
        max: 2,
        options: [
          { label: '爬山', value: '01' },
          { label: '美食', value: '02', disabled: false },
          { label: '骑车', value: '03' }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    changeEvent (value) {
      console.info(value);
    },
    bbb () {
      this.checkBox.value = ['01', '03']
    },
    ccc () {
      console.info(this.checkBox.value);
    },
    checkboxChangeEvent (value) {
      console.info('v-model：', value);
      this.checkBox.value = value
    }
  }
}
</script>

<style></style>

```



#### 单项数据流（props）

注意：这里只展示了自定义扩展后的 `prop` 属性，更多原有属性请查看 -> [checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
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

- options 中子项的参数（`label`、`value`、`disabled`），`value`参数是作为唯一值（id）来使用的是框架自身的属性，详细参数请看到 [Checkbox-button Attributes](https://element.eleme.cn/#/zh-CN/component/checkbox)

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
label | Y | String\|Number | | 控件显示值
value | Y | String\|Number | | 控件value
disabled | - | boolean | false | 是否隐藏


- listeners 事件对象如果传入了事件那么对应的`v-on`绑定的事件调用函数将不会触发。

```
<fast-checkbox
      @checkboxChange="checkboxChangeEvent"
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