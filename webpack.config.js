// npm: --save 可以简写为-S, --save-dev可以简写为-D.
// 3.6.0: 3.6.0
// ~3.6.0: 3.6.X
// ^3.6.0: 3.X.X
// *3.6.0: x.X.X @latest

const path = require('path');
const webpack = require('webpack');

//---------------------  打包目录管理 ---------------------
// 构建前删除原文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 自动生成html，并动态引入打包后的css、js等文件
const htmlWebpackPlugin = require('html-webpack-plugin');


// --------------------- (s)css 文件处理 ---------------------------------
// 提取合并 css 文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩 css 文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// -----------------------------js文件处理-----------------------------------------
// 压缩js 文件: 使用失败
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 利用webpack内置uglify插件，开启多线程压缩
const webpackUglifyJsPlugin = require('webpack-parallel-uglify-plugin');


// ------------------------------性能检测与优化-----------------------------------------------
//    1.1 slow-deps: npm install 时显示依赖大小，安装时间等
//    1.2 speed-measure-webpack-plugin: npm run build 时可视化编译耗时分布等
//    1.3 webpack-bundle-analyzer webpack 打包结果分析，找到打包过程中的性能瓶颈
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


process.traceDeprecation = true
const devServer = {
    contentBase: path.join(__dirname, 'build'),
    host: 'localhost',
    port: 8082,
    compress: true
}
webpackConfig = {
    entry:{
        omobuild: "./src/entry.js",
        vendors: ['vue', 'echarts', 'v-charts']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js'
    },
    devtool: "cheap-module-eval-source-map",
    cache: true,
    devServer,
    module:{
        rules: [
            // vue loader
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },

            // css loader type2： css/scss 一个配置，但是没单独提取，加了兼容性处理
            {
                test: /\.(sc|c|sa)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: [
                        // "style-loader",
                        {
                            loader:"css-loader",
                            options:{ sourceMap: true }
                        },
                        {
                            loader:"postcss-loader",
                            options: {
                                ident: "postcss",
                                sourceMap: true,
                                plugins: loader => [
                                    require('autoprefixer')()
                                    // 这里可以使用更多配置，如上面提到的 postcss-cssnext 等
                                    // require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader:"sass-loader",
                            options:{ sourceMap: true }
                        }
                    ]
                })
            },

            // js、jsx 文件loader
            {
                test: /(\.jsx|\.js)$/,
                // loader: "babel-loader?cacheDirectory=true",
                use: [
                    // 在babel-loader之前添加thread-loader。
                    { loader: "thread-loader" },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
                include: [path.resolve(__dirname,'/node_modules/element-ui/src'), path.resolve(__dirname,'/node_modules/element-ui/packages')],
                exclude: /node_modules/
            },

            // 其他 html 图片 字体 json 等
            {
                test: /\.(html)$/,
                loader: 'html-loader',
                options: {
                    attrs: [':data-src']
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    name: './img/[name][hash:8].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },



            // 候补未启用 loader： 图片处理，优化图片大小

            // css loader type1： css / scss 分别配置，css 单独提取
            // {
            //     test: /\.s[ac]ss$/,
            //     // test: /\.(sc|c|sa)ss$/,
            //     use: [
            //         {
            //             loader: 'vue-style-loader'
            //         },
            //         {
            //             loader: "style-loader" // creates style nodes from JS strings
            //         }, {
            //             loader: "css-loader" // translates CSS into CommonJS
            //         }, {
            //             loader: "sass-loader" // compiles Sass to CSS
            //         }
            //     ]
            // },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: {
            //             loader: "css-loader",
            //             options: {
            //                 sourceMap: true
            //             }
            //         }
            //     })
            // },

            // css loader type3: css/ scss 一个配置，并且单独提取出来
            // {
            //     test: /\.(sc|c|sa)ss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: [
            //             {
            //                 loader: "css-loader",
            //                 options: {
            //                   sourceMap: true
            //                 }
            //             },
            //             {
            //                 loader: "sass-loader", // compiles Sass to CSS
            //                 options: {
            //                     sourceMap: true
            //                 }
            //             }
            //         ]
            //     })
            // },

            // 对图片增加图片压缩loader
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/,
            //         include: [path.resolve(__dirname, 'src/')],
            //     use: [
            //         {
            //             loader: 'url-loader', // 根据图片大小，把图片转换成 base64
            //             options: { limit: 10000 },
            //         },
            //         {
            //             loader: "image-webpack-loader",
            //             options: {
            //                 mozjpeg: { progressive: true, quality: 65 },
            //                 optipng: { enabled: false },
            //                 pngquant: { quality: '65-90', speed: 4 },
            //                 gifsicle: { interlaced: false },
            //                 webp: { quality: 75 }
            //             }
            //         },
            //     ]
            // }

            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'file-loader',
            //     options: {
            //         outputPath: "images/",
            //         useRelativePath: true,
            //         name: "[name].[hash:8].[ext]",//8表示截取 hash 的长度,ext表示原来是啥类型，就是啥类型
            //         limit: 10000
            //     }
            // },
        ]
    },
    node:{
        fs: 'empty',
        net:'empty',
        tls:"empty",
        child_process: 'empty'
    },
    resolve: {
        extensions: ['.js', '.vue',  '.json'],
        modules: [path.resolve(__dirname, "src"), 'node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': path.resolve(__dirname, './src'),
            'components': path.resolve(__dirname, './components')
        }
    },
    resolveLoader: {
        alias: {
            // 'scss-loader': 'sass-loader'
        },
    },
    externals: {
        Vue: 'vue/dist/vue.js'
    },
    plugins:[
        // 自动清空打包目录
        new CleanWebpackPlugin(),
        // 自动生成index，并动态引入css js 文件
        new htmlWebpackPlugin({
            filename: 'index.html', // 生成页
            template: 'template.html', // 模板页
            cache: true,
            minify: { // 模板页压缩选项
                collapseWhitespace: true, // 移除空格
                removeComments: true, // 移除注释
                removeAttributeQuotes: true, // 移除双引号
            }
        }),

        // 性能检测与优化：显示各个资源的大小比例，现在用smp，暂时不用
        // new BundleAnalyzerPlugin(),

        // 单独提取 css
        new ExtractTextPlugin("css/style.css"),
        // 压缩css文件
        new OptimizeCssAssetsPlugin(),


        // 压缩 js 文件: 未生效
        new UglifyJsPlugin({
            cache: true, parallel: true, sourceMap: true // 缓存，并行压缩，sourceMap
        }),


        // 结合webpack自带得压缩插件多线程压缩
        // 这个也严重影响打包/热更得速度
        // new webpackUglifyJsPlugin({
        //     cacheDir: '.cache/',
        //     uglifyJS:{
        //         output: {
        //             comments: false
        //         }
        //     }
        // }),

        // webpack 内置插件
        // 压缩js: 这个插件严重影响热更速度，原来不到1s，现在6s多
        // new webpack.optimize.UglifyJsPlugin({
        //     cache: true,
        //     output: {
        //         comments: false
        //     },
        //     compress: {
        //         warnings: false
        //     }
        // }),

        // 提取公共资源
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'})
    ]
}

// build 时显化打包性能
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(webpackConfig);

