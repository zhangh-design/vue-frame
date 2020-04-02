/**
 * @desc 单独打包主题库
 */
var gulp = require("gulp");
var { series } = require("gulp");
var less = require("gulp-less");
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css"); // 压缩css
var autoprefixer = require("gulp-autoprefixer");
var del = require("del"); //删除文件
var chalk = require("chalk");

var baseDir = {
  basePath: "./",
  packages: "./packages/",
  theme: "./lib-theme/"
};

function cleanTask(done) {
  // process.argv 可以获取npm指令中传递的参数
  var themeName = "theme-default"; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace("--", "") + "/";
  }
  // 删除主题目录下的所有文件，但保留lib-theme文件夹
  del([baseDir.theme + +themeName + "*.css"]);
  console.log(
    chalk.blue(
      "删除 " + baseDir.theme + " 目录中 " + themeName + " 旧的主题样式包!"
    )
  );
  done();
}

function themeTask(done) {
  var themeName = "theme-default/"; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace("--", "") + "/";
  }
  gulp
    .src(baseDir.packages + themeName + "**/*.less")
    .pipe(less()) // 编译开发环境下的less
    .pipe(autoprefixer())
    .pipe(cleanCss()) // 压缩css
    .pipe(gulp.dest(baseDir.theme + themeName)) // 输出css文件
    .pipe(concat("index.css")) // 合并所有的css文件到名为index.css的文件中
    .pipe(gulp.dest(baseDir.theme + themeName)); //输出压缩版index.css
  console.log(
    chalk.blue(
      themeName +
        " 主题样式库打包结束!，输出位置：" +
        baseDir.packages +
        themeName
    )
  );
  done();
}

exports.themeTask = series(cleanTask, themeTask);
