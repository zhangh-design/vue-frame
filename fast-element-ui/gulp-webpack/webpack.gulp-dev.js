const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'development',
  entry: './examples/main.js',
  output: {
    path: path.resolve(__dirname, '../lib-src/'),
    filename: '[name].js'
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
        use: ['style-loader', 'css-loader']
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
    new HtmlWebpackPlugin({
      template: './public/index.html'
      /* minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true // 注释
      } */
    }),
    new CopyPlugin([
      {
        // ./public/static/ 里的文件拷贝到 dist 的根目录
        from: path.resolve(__dirname, '../public/static/'),
        to: './',
        ignore: ['.*']
      }
    ]),
    new LodashWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // initial（同步） async（异步） all（同步和异步）
      minSize: 30000, // 30kb
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // vendors: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js' // 同步引入
        },
        // default: false
        default: {
          // minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  }
};
