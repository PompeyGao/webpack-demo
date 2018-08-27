const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/index.js')
    },
    devtool: 'cheap-module-eavl-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true // 使用 css 的压缩功能
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                // 压缩 jpeg 的配置
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                                enabled: true
                            },
                            pngquant: {
                                // 使用 imagemin-pngquant 压缩 png
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                // 压缩 gif 的配置
                                interlaced: true
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'index.html',
            template: path.join(__dirname, 'static/template.html'),
            minify: {
                // 压缩 HTML 的配置
                removeAttributeQuotes: true, // 压缩 去掉引号
                minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
                minifyJS: true // 压缩 HTML 中出现的 JS 代码
            }
        }),
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('development')
            // webpack4  由于上面指定了mode: development, 会将 process.env.NODE_ENV 的值设为 development，不需要手动指定
        }),
        new CopyWebpackPlugin([
            { from: 'static/file1.js', to: 'cpoyfile1.js' },
            { from: 'static/style1.css' }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        })
    ],

    resolve: {
        alias: {
            containers: path.join(__dirname, 'src/containers'),
            components: path.join(__dirname, 'src/components')
        },
        extensions: ['.js', '.json', '.jsx'],
        modules: ['node_modules', path.resolve(__dirname, 'node_modules')]
    },

    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all', // 必须三选一： "initial" | "all"(默认就是all) | "async"
            // minSize: 30000, // 最小大小，默认30000
            // minChunks: 1, // 最小 chunk ，默认1
            // maxAsyncRequests: 5, // 最大异步请求数， 默认5
            // maxInitialRequests: 3, // 最大初始化请求书，默认3
            // name: true,
            // 上面的代码就表示，在所有代码中，引用模块大小最小为30kb，引用次数最少为1次，
            // 按需加载最大请求次数为5，初始化加载最大请求次数为3的所有模块就行拆分到一个单独的代码块中，
            // name表示代码的名字，设置为true则表示根据模块和缓存组的key自动生成。
            cacheGroups: {
                // default: {
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true
                // },
                // 打包重复出现的代码
                common: {
                    // 抽离第三方插件
                    // test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包。可以传递的值类型：RegExp、String和Function
                    chunks: 'all'
                    // priority: 0, // 默认自定义缓存组优先级为0
                    // minChunks: 2,
                    // maxInitialRequests: 5,
                    // minSize: 30000,
                    // name: 'common' // 打包后的文件名，任意命名
                }
            }
        }
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 4000,
        historyApiFallback: true,
        publicPath: '/',
        open: true,
        hot: true
    }
};
