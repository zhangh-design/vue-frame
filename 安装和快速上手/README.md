安装和快速上手

#### 安装

> 安装依赖包

- element-ui

```
npm i element-ui --save
```

- fast-element-ui （二次扩展库插件）

```
npm i fast-element-ui --save
```

- axios-api-query （ajax请求插件）

```
npm i axios-api-query querystring vdjs@1.0.0 --save
```

- lodash （帮助函数插件）

`lodash`如果使用的是脚手架那么可能脚手架已经帮你安装了（比如：Vue CLI）。

```
npm i lodash --save
```

或者

```
npm i lodash-es --save
```

---

#### 快速上手

> 本节将介绍如何在项目中使用 fast-element-ui。

- **完整引入**

> 在 main.js 中写入以下内容：

```
import Vue from 'vue';
// 完整引入 element-ui 库和样式文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 fast-element-ui 插件和样式文件
import FastElementUI from './components/common/index.js'
import 'fast-element-ui/lib/theme-default/index.css'
import App from './App.vue';

// 使用
Vue.use(FastElementUI)
Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

注意：以上代码便完成了 Element 和 FastElement 的引入。

需要注意的是，完整引入的方式样式文件需要单独引入。

- **按需引入**

注意：

- element-ui 请使用[->官网](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)上的按需引入方式。
- fast-element-ui 如果需要支持按需引入，element-ui 就要使用 cdn 引入，然后在 .babelrc 中这样配置：

```
plugins: [
  [
      "component",
      {
        "libraryName": "fast-element-ui",
        "styleLibraryName": "theme-default"
      }
    ]
]
```

建议：`fast-element-ui` 本身就很小直接使用全局引入就可以了，element-ui 还是建议按需加载。


说明按需引入方式（这种使用方式只支持了 element-ui 的按需引入，fast-element-ui还是全部引入的）：

```
import { Message, Input, Button, Container, Header, Aside, Main, Footer } from 'element-ui'
import { FastTextInput, FastButton, FastPanel, FastBorderLayout } from 'fast-element-ui'
import 'fast-element-ui/lib/theme-default/index.css'

Vue.use(FastTextInput, Input)
Vue.use(FastButton, Button)
Vue.use(FastPanel, [Container, Header, Aside, Main, Footer, FastBorderLayout])
```
