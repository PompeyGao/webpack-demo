const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os'); // node 提供的系统操作模块
// 根据系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    mode: 'development', // production

    entry: {
        app: path.join(__dirname, 'src/index.js')
    },

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
                use: 'happypack/loader?id=babel'
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src')],
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
                                enabled: false
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
        new HappyPack({
            id: 'babel',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            ],
            threadPool: happyThreadPool
        }),
        new HtmlWebpackPlugin({
            title: 'webpack demo_hp',
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
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin() // devserver  hot: true 时开启
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
            chunks: 'all',
            cacheGroups: {
                commons: {
                    chunks: 'all'
                }
            }
        }
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 4000,
        publicPath: '/',
        historyApiFallback: true,
        open: true,
        hot: true
    }
};
