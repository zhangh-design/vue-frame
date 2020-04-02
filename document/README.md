使用说明

- 完整引入

> 在 main.js 中写入以下内容：

```
// 完整引入 element-ui 库和样式文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 fast-element-ui 插件
import FastElementUI from './components/common/index.js'

// 使用
Vue.use(FastElementUI)
Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

注意：以上代码便完成了 Element 和 FastElement 的引入。需要注意的是，样式文件需要单独引入。

- 按需引入

1. 首先我们按照`Element-UI`[官网](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)上的操作使用`babel-plugin-component`来实现按需加载`Element-UI`的组件。

2. 按需引入`Fast-Element-UI`






