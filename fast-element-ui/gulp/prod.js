/**
 * @desc 生产模式打包
 */
var webpack = require("webpack");
var gulp = require("gulp");
var { series } = require("gulp");
var less = require("gulp-less");
var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css"); // 压缩css
var autoprefixer = require("gulp-autoprefixer");
var webpackConfProd = require("../webpack.prod.js");
var del = require("del"); //删除文件/文件夹
var chalk = require("chalk");
var moment = require("moment");
moment.locale("zh-cn");

var baseDir = {
  basePath: "./",
  packages: "./packages/",
  // 回收站-目录
  recycler: "./lib-recycler-station/",
  theme: "./lib-theme/"
};

// 生产环境目录配置
var build = {
  basePath: "./lib/",
  js: "./lib/",
  images: "./lib/images/",
  font: "./lib/font/"
};

// 删除lib目录下的所有文件，但保留lib文件夹
function cleanTask(done) {
  del([build.basePath + "/*"]);
  console.log(chalk.blue("删除 " + build.basePath + " 目录，清空上个版本的打包文件！"));
  done();
}

// 把上一个版本放到回收站
function recyclerLibTask(){
  var lastVersion = moment(new Date()).format("YYYY-MM-DD HH-mm-ss")
  console.log(chalk.blue("将上一个版本放入回收站 "+baseDir.recycler+" ，版本号："+lastVersion));
  return gulp
    .src(build.js + "**/*.*")
    .pipe(
      gulp.dest(
        baseDir.recycler + lastVersion
      )
    );
}

function lessTask(done) {
  // process.argv 可以获取npm指令中传递的参数
  var themeName = "theme-default"; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace("--", "") + "/";
  }
  gulp
    .src(baseDir.packages + themeName + "**/*.less")
    .pipe(less()) // 编译开发环境下的less
    .pipe(autoprefixer())
    .pipe(cleanCss()) // 压缩css
    .pipe(gulp.dest(build.basePath + themeName)) // 输出css文件
    .pipe(concat("index.css")) // 合并所有的css文件到名为index.css的文件中
    .pipe(gulp.dest(build.basePath + themeName)); //输出压缩版index.css
  console.log(chalk.blue("less 文件打包结束！"))
  done();
}

function gulpWebpackProdTask(done){
  webpack(webpackConfProd, function(err, stats) {
    console.log(chalk.blue("webpack js文件打包结束！"))
    done();
  });
}

exports.cleanProdTask = cleanTask;
exports.gulpWebpackProdTask = series(recyclerLibTask, cleanTask, lessTask, gulpWebpackProdTask);
