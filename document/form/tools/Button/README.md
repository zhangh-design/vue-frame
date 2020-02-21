## Button 按钮

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
    >
      <!-- 可以传入默认插槽 template -->
      <!--<template v-slot:default>
        升级
      </template>-->
    </fast-button>
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

Tips: 对象写法必须在 Form 表单控件中才有效。

```
{name: 'submit-btn', type: 'Button', width: 150, text: '提交', type: 'primary', icon: "el-icon-edit", 'icon-position': 'right', listeners: {
    click: (event) => {
        console.info('按钮点击事件：', event)
    }
},
slotNode: {
  template: '<em>取消</em>'    
}
}
```

#### 使用表单组件（对象写法在模板中的使用）

Tips: `slotNode`和`listeners`属性的使用。

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
      :slot-node="slotNode"
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
    // 主要是 listeners 对象的使用 ，其它参数没有区别
    this.listeners={
        click: () => {
          console.info(event);
        }
    }
    this.slotNode = {
      template: '<em>取消</em>'
    }
    return {
      isDisplay: true,
      loading: true
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
text | — | String |  —  | 按钮文字（传html结构字符将直接输出在按钮上，可以使用默认slot和slotNode属性）
isRender | — | Boolean |  true | 是否渲染组件（v-if）
isDisplay | — | Boolean |  true | 是否显示组件（v-show）
listeners | — | Object |  {} | 组件事件对象
iconPosition | — | String |  left | 按钮图标位置  'left/right'
slotNode | — | Object |  {} | 组件 slot 对象（用于传递html结构的字符）

#### listeners

事件 | 说明 | 返回值 | 示例
---|---|---|---
click | 按钮点击事件 | (event: Event) | listeners: {click: (event)=>{}}

#### 注意：

- 在模板`template`中使用时如果同时传入`click`和`listeners: {click: ()=>{}}`那这样的话起作用的是`listeners`对象中配置的`click`事件属性。

```
<fast-button
      text="提交"
      :listeners="listeners"
      @click="clickHandler"
    />
data(){
    this.listeners = {
      click: () => {
        // 这个事件处理函数生效
        console.info('b', event);
      }
    }
    return {}
},
methods: {
    clickHandler (event) {
      // 不生效，因为配置了 listeners 对象
      console.info('a', event);
    }
}
```


- `text` 属性

如果我们传入了`slotNode`属性或者`slot`默认插槽节点其中的一个，那么`text`属性将会失效。

```
<fast-button text="提交"/>
```

- `slotNode` 属性
 
这个属性用于传递`html`结构的内容到按钮中，作用和`text`属性是一样的，只是`text`属性无法传递`html`结构的内容。

如果我们的写法是 `对象写法` 的话如果要传递`html`结构的字符到控件中这样只能使用`slotNode`属性。

```
<fast-button :slot-node="slotNode"/>
 data () {
    // 非响应式的数据可以写在 return 上面
    this.slotNode = {
      template: '<em>取消</em>'
    }
    return {}
  }
```

- `slot` 默认插槽

如果我们在模板语法中写了默认插槽`slot`，那么`text`和`slotNode`配置的数据将都失效，起作用的是`slot`默认插槽。

```
<fast-button
      text="提交"
      :slot-node="slotNode"
      type="primary"
      icon="el-icon-edit"
      icon-position="right"
      :loading="loading"
      :is-display="isDisplay"
      @click="clickHandler"
    >
      <template v-slot:default>
        升级
      </template>
    </fast-button>
```


