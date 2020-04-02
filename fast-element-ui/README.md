## 框架说明

**说明：**

`fast-element-ui`组件库框架项目使用 gulp+webpack 构建，gulp负责打包组件库中的主题样式文件，webpack负责打包各个js、vue结尾的组件文件（目前组件库只有这两种文件，并且打包也只支持这两种后缀的文件如果有其它后缀的文件引入请扩展 gulpfile.js和webpack的loader）。

**使用：**

完整引入 和 按需引入 两种方式（具体请见`安装和快速上手`）。

**npm指令：**

启动开发模式下的编译，由webpack-dev-server启动运行项目

```
npm run dev
```

打包生产环境构建包

```
npm run build
```

打包主题样式

```
npm run build:theme
```

启动开发模式下的编译，由browsersync启动运行项目

```
npm run gulp-dev
```

**使用不同的组件库如何打包：**

打开`package.json`文件：

```
"dev": "gulp gulp-webpack:dev --theme-default && webpack-dev-server --config ./webpack.dev.js",
"build": "gulp server:prod --theme-default",
"build:theme": "gulp theme --theme-default",
"gulp-dev": "gulp server:dev --theme-default"
```

修改指令中的`theme-default`为新的主题库目录名称然后在运行`npm`命令即可（`--`为必要字符请勿删除，新的主题库文件必须放在`packages`文件夹中）。


项目目录介绍：

```
config
 |-dev.env.js  // 开发环境变量
 |-prod.env.js // 生产环境变量
examples // 开发环境示例 （组件测试在这个目录中编写代码）
 |-assets
 |-components
 |-App.vue
 |-main.js
gulp
 |-dev.js   // gulp打包开发环境配置
 |-prod.js  // gulp打包生产环境
 |-theme.js // gulp打包主题样式
gulp-webapck
 |-webpack.gulp-dev.js // gulp调用webpack启动开发模式服务器
 |-webpack.lib.js      // gulp调用webpack打开主文件`fast-element-ui.common.js`
lib // 生产环境打包输出目录
lib-recycler-station // 生产环境打包输出目录-回收站
lib-src  // 开发环境打包输出目录
lib-theme // 主题样式
packages // 组件库源代码
public
 |-static
 |-index.html // index.html 页面
static // 静态资源
test   // 测试目录
.babelrc // babel es6 -> es5
.browserslistrc // autoprefixer 浏览器兼容性配置
.editorconfig   // 编辑器设置
.gitignore      // git过滤文件配置
.gulpfile.js    // gulp配置
.package.json   // 包管理配置
.postcss.config.js // postcss
.webpack.dev.js    // webpack开发环境打包配置
.webpack.prod.js   // webpack生产环境打包配置
```
