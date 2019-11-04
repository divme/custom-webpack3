const path = require('path');
const webpack = require('webpack');
// 自动生成html，并将打包后js插入该html
const htmlWebpackPlugin = require('html-webpack-plugin');
// 单独提取出css
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 构建前删除原文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 单独提取出图片
// 把公共部门提取出来
// css类名混淆

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

YourWebpackConfig = {
    // entry: "./pages/entry.js",
    entry:{
        build: "./src/entry.js",
        vendors: ['vue']
    },
    // output:   __dirname + "/build/bundle.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 8082
    },
    devtool: "source-map",
    module:{
        rules: [
            // {
            //     test: /\.s[ac]ss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader: 'scss-loader'
            //         },
            //     ],
            // },
            // {
            //     test:/\.s[ac]ss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "scss-loader"
            //     })
            // },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader?cacheDirectory=true",
                exclude: /node_modules/
            },
            {
                test: /\.json$/,

                loader: 'json-loader'
            },

            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'file-loader',
            //
            // },

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

            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader?limit=2000&name=./image/[name][hash].[ext]?',
            //
            // },

            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    name: './img/[name][hash:8].[ext]'
                 }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.(html)$/,
                loader: 'html-loader',
                options: {
                    attrs: [':data-src']
                }
            }
        ]
    },
    node:{
        fs: 'empty'
    },
    resolve: {
        extensions: ['.js', '.vue',  '.json'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': path.resolve(__dirname, './src'),
            'components': path.resolve(__dirname, './components')
        }
    },
    externals: {
        Vue: 'vue/dist/vue.js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            cache: true
        }),
        new ExtractTextPlugin("css/style.css")
    ]
}

module.exports = smp.wrap(YourWebpackConfig);

