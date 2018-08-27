const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

console.log('start ...');
module.exports = merge(commonConfig, {
    mode: 'development',
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin() // devserver  hot: true 时开启
    ]
})