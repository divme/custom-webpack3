const webpack = require('webpack')
const path = require('path')
const cssnano = require('cssnano')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeVersionCompare = require('node-version-compare')
const SimpleProgressPlugin = require('webpack-simple-progress-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const chalk = require('chalk')

const result = nodeVersionCompare('12.0.0', process.version.replace('v', ''))
if (result > 0) {
  console.log(chalk.bgRed(chalk.black(`Error: current Node version is ${process.version}, please upgrade the version to v12.0.0 or the latest version`)))
  process.exit()
}

module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.js')
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        moment: {
          name: 'chunk-moment',
          test: /[\\/]node_modules[\\/]moment[\\/]/,
          priority: 30
        },
        elementUI: {
          name: 'chunk-elementUI',
          priority: 20,
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        },
        commons: {
          name: 'chunk-commons',
          test: path.resolve('src/components'),
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  },
  recordsPath: path.join(__dirname, 'records.json'),
  output: {
    filename: 'assets/[name].[chunkhash:8].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: 'production',
  module: {
    rules: [
      // js vue文件
      {
        test: /\.(js|vue)$/,
        loader: 'happypack/loader?id=happyEslint',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        exclude: /node_modules/
      },
      // vue 文件
      {
        test: /\.vue$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'vue-loader'
      },
      // 图片
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:8].[ext]',
              publicPath: '../'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 35
              },
              optipng: {
                optimizationLevel: 3
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      // css
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: 'happypack/loader?id=happyPostCssLoader'
          }
        ]
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'happypack/loader?id=happyPostCssLoader'
          }]
      },
      // js
      {
        test: /\.js/,
        exclude: /node-modules/,
        loader: 'happypack/loader?id=happyBabel'
      },
      // 字体
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:8].[ext]',
          publicPath: '../'
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['transform-class-properties']
        }
      }],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new HappyPack({
      id: 'happyEslint',
      loaders: [{
        loader: 'eslint-loader',
        options: {
          fix: true,
          formatter: require('eslint-friendly-formatter')
        }
      }],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new HappyPack({
      id: 'happyPostCssLoader',
      loaders: [{
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'sass-loader'
      }],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new TerserPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        },
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      chunks: ['index', 'chunk-libs', 'chunk-moment', 'chunk-elementUI', 'chunk-commons', 'runtime'],
      filename: 'index.html',
      template: './src/views/index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime\..*\.js$/
    }),
    new VueLoaderPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      { from: './src/static', to: './' },
      { from: './src/json', to: './json' }
    ]),
    new CleanWebpackPlugin(),
    new SimpleProgressPlugin(
      {
        messageTemplate: [':bar', 'xxx打包进度:', chalk.green(':percent'), '耗时:', chalk.redBright(':elapsed'), '秒', ':msg'].join(' '),
        progressOptions: {
          complete: chalk.bgGreen(' '),
          incomplete: chalk.bgWhite(' '),
          width: 40,
          total: 100,
          clear: false
        }
      }
    )
  ],
  resolve: {
    extensions: ['*', '.js', '.vue'],
    alias: {
      '@container': path.join(__dirname, 'src/containers'),
      '@components': path.join(__dirname, 'src/components')
    }
  }
}
