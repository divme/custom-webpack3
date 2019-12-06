const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
const nodeVersionCompare = require('node-version-compare');

const result = nodeVersionCompare('12.0.0', process.version.replace('v', ''));
if (result > 0) {
    console.log(chalk.bgRed(chalk.black(`Error: current Node version is ${process.version}, please upgrade the version to v12.0.0 or the latest version`)));
    process.exit();
}

module.exports = {
    entry: {
        index: path.join(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        hot: true,
        port: 8080,
        open: true,
        host: 'localhost'
    },
    module: {
        rules: [
            // js/vue eslint
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.join(__dirname, 'src')],
                exclude: /node_modules/,
                options: {
                    fix: true,
                    formatter: require('eslint-friendly-formatter')
                }
            },
            // vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 图片
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
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
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                autoprefixer({})
                            ]
                        }
                    }
                ]
            },
            // scss
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                autoprefixer({})
                            ]
                        }
                    }, 'sass-loader']
            },
            // js:babel
            {
                test: /\.js/,
                exclude: /node-modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['transform-class-properties']
                        }
                    }
                ]
            },
            // 字体
            {
                test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]?[hash:8]',
                    publicPath: '../'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: './src/views/index.html'
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            { from: './src/static', to: './' },
            { from: './src/json', to: './json' }
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['*', '.js', '.vue'],
        alias: {
            '@container': path.join(__dirname, 'src/containers'),
            '@components': path.join(__dirname, 'src/components')
        }
    }
};
