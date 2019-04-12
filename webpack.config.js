const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:  "./pages/entry.js",
    // output:   __dirname + "/build/bundle.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 8082
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
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
        extensions: [ '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            'pages': path.resolve(__dirname, './pages'),
            'components': path.resolve(__dirname, './components')
        }
    },
    plugins:[
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html'
        })
    ]
}