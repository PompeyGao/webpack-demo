const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    mode: 'development', // production

    entry: {
        app: path.join(__dirname, 'src/index.js')
        // vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js',
        filename: '[name].[hash].js',
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
                include: [path.resolve(__dirname, 'src')],
                use: [
                    argv.mode === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
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
            filename: '[name].css',
            chunkFilename: '[id].css'
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
        port: 8000,
        historyApiFallback: true,
        publicPath: '/',
        open: true,
        hot: true
    }
});
