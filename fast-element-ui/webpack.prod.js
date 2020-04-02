/**
 * @desc webpack生产环境打包，打包好的库即可发布到npm
 */
/**
 * @file 生产环境打包
 */
const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const Glob = require('glob')

/**
 * @desc 读取 packages 目录中所有组件文件拼装成多入口 entry
 */
const setMPA = function(){
  const entry = {}
  const entryFiles = Glob.sync('./packages/*/index.js')
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/packages\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[`fast-${pageName}`] = entryFile
  })
  return { entry }
}
const { entry } = setMPA();

module.exports = {
  context: path.resolve(__dirname, "./"),
  mode: "production",
  performance: {
    hints: false
  },
  entry: {
    "fast-element-ui.common": "./packages/index.js",
    ...entry
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "./lib"),
    library: "FastElementUI", //指定库的全局变量
    libraryExport: "default", //默认即使用LoaderApiLibrary为插件的全局变量名
    libraryTarget: "umd" //支持库引入的方式 AMD、CJS、EM module、CDN
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/prod.env')
    }),
    /* new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "./lib")]
    }), */
    new VueLoaderPlugin(),
    new LodashWebpackPlugin()
    /* new UglifyJsPlugin({
      parallel: true
    }) */
  ]
};

