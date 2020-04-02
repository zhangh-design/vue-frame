## vue-frame

- 使用 render 函数二次封装 UI 库实现将 模板形式（`template`） 的写法转换成 面向对象 形式。
- 使用 extend 函数方便高效的进行二次扩展。
- 主 UI 库使用 element-ui。
- 组件库体积小，所有组件都是基于`element-ui`。
- 支持 完整引入 和 按需引入 两种方式。

##### 使用：

安装和快速上手请查看：安装和快速上手/README.md

##### 二次开发：

下载`fast-element-ui`即可进行二次开发（需要同时熟悉`webpack`和`gulp`），组件库说明请查看 fast-element-ui/README.md

##### 构建工具
- webpack - 4.25.0
- gulp - 4.0.2

##### 依赖包

插件 | 版本
---|---
Vue.js | 2.6
element-ui | 2.13.0
lodash | 4.17.15
axios-api-query | 1.0.1

frame

控件 | 说明
---|---
form | 表单
grid | 数据表格
grid-property | 属性数据列表
layout | 布局
menu | 菜单
navmenu | 导航菜单
panel | 面板
sys-module | 父子联动数据表格
tabs | 选项卡
tool-bar | 工具栏
tree | 树
ueditor | 富文本编辑框
window | 可拖动窗口
