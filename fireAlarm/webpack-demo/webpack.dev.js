const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./public", // 服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        port: 3030,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 加热插件        
    ]
})