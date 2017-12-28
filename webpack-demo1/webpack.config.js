
// __dirname 是node.js一个全局变量，指向当前执行的脚本所在文件目录。
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'), // 唯一入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 打包后文件存放的位置
        filename: 'js/[name]-[chunkhash].js', // 打包后输出文件的文件名
    },
    module: {
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'), // new 这个插件实例，并传入相关的参数
            filename: path.resolve(__dirname, 'build/index.html'),
            inject: 'body'
        }),


    ],
};
