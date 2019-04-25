const path = require('path');
// const webpack = require('webpack');
// 自动生成html，并将打包后js插入该html
const htmlWebpackPlugin = require('html-webpack-plugin');
// 单独提取出css
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 单独提取出图片
// 把公共部门提取出来
// css类名混淆


module.exports = {
    entry: "./pages/entry.js",
    // entry:{
    //     app: "./pages/entry.js",
    //     vendors: ['vue']
    // },
    // output:   __dirname + "/build/bundle.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'dede.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 8082
    },
    // devtool: "source-map",
    module:{
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [{
            //         loader: "style-loader"
            //     }, {
            //         loader: "css-loader"
            //     }]
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',

            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
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
            'pages': path.resolve(__dirname, './pages'),
            'components': path.resolve(__dirname, './components')
        }
    },
    plugins:[
        // new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors'})
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html'
        }),
        new ExtractTextPlugin("style.css")
    ]
}