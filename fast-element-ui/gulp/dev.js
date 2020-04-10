/**
 * @desc 开发模式打包
 */
var webpack = require('webpack');
var gulp = require('gulp');
var { series } = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create(); // 服务器同步
var reload = browserSync.reload;
var webpackConfGulpLib = require('../gulp-webpack/webpack.lib.js');
var webpackConfGulpDevRun = require('../gulp-webpack/webpack.gulp-dev.js');
var del = require('del'); // 删除文件/文件夹
var cheerio = require('gulp-cheerio'); // 以标签形式内联css、js到html页面
var chalk = require('chalk');

var baseDir = {
  basePath: './',
  packages: './packages/',
  // 回收站-目录
  recycler: './lib-recycler-station/',
  theme: './lib-theme/'
};

// 开发环境目录配置
var src = {
  basePath: './lib-src/',
  images: './lib-src/images/',
  font: './lib-src/font/'
};

// 删除lib-src目录下的所有文件，但保留lib-src文件夹
function cleanTask (done) {
  del([src.basePath + '/*']);
  console.log(chalk.blue('删除 ' + src.basePath + ' 目录，清空上个版本的打包文件！'));
  done();
}

/**
 * @desc 处理less样式即组件库的样式
 */
function lessTask (done) {
  // process.argv 可以获取npm指令中传递的参数
  var themeName = 'theme-default'; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace('--', '') + '/';
  }
  gulp
    .src(baseDir.packages + themeName + '**/*.less')
    .pipe(less()) // 编译开发环境下的less
    .pipe(autoprefixer())
    .pipe(gulp.dest(src.basePath + themeName)) // 输出一个未压缩版
    .pipe(concat('index.css')) // 合并所有的css文件到名为index.css的文件中
    .pipe(gulp.dest(src.basePath + themeName)) // 输出合并版index.css
    .pipe(reload({ stream: true })); // 通知服务器进行更新操作
  console.log(chalk.blue('less 文件打包结束！'))
  done();
}

/**
 * @desc 执行webpack-dev配置，打包fast-element-ui.common.js
 */
function packGulpLibTask (done) {
  webpack(webpackConfGulpLib, function (err, stats) {
    console.log(chalk.blue('webpack打包组件库入口 index.js 文件打包结束，输出文件：fast-element-ui.common.js 成功！'));
    done();
  });
}

/**
 * @desc 执行webpack-base配置，打包examples目录和输出html
 */
function packGulpDevRunTask (done) {
  webpack(webpackConfGulpDevRun, function (err, stats) {
    console.log(chalk.blue('webpack打包 examples 目录结束！'));
    done();
  });
}

/**
 * @desc html文件
 */
function htmlDevTask () {
  var themeName = 'theme-default'; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace('--', '') + '/';
  }
  return gulp
    .src('./public/index.html')
    .pipe(
      cheerio(function ($) {
        $('script').remove();
        $('link').remove();
        $('body').append('<script src="./fast-element-ui.common.js"></script>');
        $('head').append(
          '<link rel="stylesheet" href="./' + themeName + 'index.css">'
        );
        $('head').append(
          '<link rel="Shortcut Icon" href="./favicon.ico" type="image/x-icon" />'
        );
      })
    )
    .pipe(gulp.dest('./public/'));
}

// 初始化 browserSync 服务器
function openBrowserSyncTabsk (done) {
  browserSync.init({
    server: {
      baseDir: './lib-src/',
      index: 'index.html' // 指定特定文件名为索引
    },
    port: 7070
  });
  // 监控文件变化
  // gulp.watch("lib-src/*.html", series(["html:dev"]));
  gulp.watch('packages/theme-default/*.less', series(lessTask));
  gulp.watch(
    ['packages/**/*.js', 'packages/**/*.vue'],
    series(packGulpLibTask)
  );
  gulp.watch(['examples/**/*.*'], series(packGulpDevRunTask));
  gulp.watch('lib-src/*.js').on('change', reload);
  gulp.watch('lib-src/*.js').on('add', reload);
  gulp.watch('lib-src/*.js').on('unlink', reload);
  done();
}

exports.cleanDevTask = cleanTask;

/**
 * @desc webpack开发模式下打包（npm run dev 时调用）
 * pack:gulp-dev-run 任务的编译由 webpack-dev-server 调用 webpack.dev.js 来进行开发环境的打包
 * 静态服务器由 webpack-dev-server 提供
 */
exports.gulpWebpackDevTask = series(
  cleanTask,
  htmlDevTask,
  lessTask,
  packGulpLibTask
);

exports.serverDevTask = series(
  cleanTask,
  htmlDevTask,
  lessTask,
  packGulpLibTask,
  packGulpDevRunTask,
  openBrowserSyncTabsk
);
