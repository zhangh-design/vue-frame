/**
 * @file gulp 打包配置文件
 * @author zhangh
 */
// 开发模式
const {
  cleanDevTask,
  gulpWebpackDevTask,
  serverDevTask
} = require('./gulp/dev.js');
// 生产模式
const { cleanProdTask, gulpWebpackProdTask } = require('./gulp/prod.js');
// 打包样式主题
const { themeTask } = require('./gulp/theme.js');

exports.default = function () {}; // 默认任务（必须）
exports.cleanDevTask = cleanDevTask; // 删除开发模式打包输出的文件
exports['gulp-webpack:dev'] = gulpWebpackDevTask; // 启动开发服务器 `webpack-dev-server`
exports['server:dev'] = serverDevTask; // 启动开发服务器 `browsersync`
exports.cleanProdTask = cleanProdTask; // 直接删除不走回收站（不建议使用）
exports['server:prod'] = gulpWebpackProdTask; // 生产环境打包
exports.theme = themeTask; // 打包主题样式库
