/**
 * @file 开发环境打包
 */
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',
  entry: {
    'fast-element-ui.common': './packages/index.js'
  },
  output: {
    // path: path.resolve(__dirname, "../lib-src/vendor/FastElementUI/"),
    path: path.resolve(__dirname, '../lib-src/'),
    filename: '[name].js',
    library: 'FastElementUI',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:8].[ext]',
            outputPath: 'images/',
            limit: 10000,
            esModule: false
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new LodashWebpackPlugin(),
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      parallel: true
    })
  ],
  optimization: {}
}
