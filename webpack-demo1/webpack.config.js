
// __dirname 是node.js一个全局变量，指向当前执行的脚本所在文件目录。
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'), // 唯一入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 打包后文件存放的位置
        filename: 'js/[name].js', // 打包后输出文件的文件名
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),  // 服务器所加载的页面目录
        inline: true,
        port: 2333,
        hot: true,
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],  // 为css在不同浏览器中添加前缀
                            browser: ['last 5 versions']        // 浏览器最新的五个版本。
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],  // 为css在不同浏览器中添加前缀
                            browser: ['last 5 versions']        // 浏览器最新的五个版本。
                        }
                    },
                    { loader: 'less-loader' },
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: '/app',
                exclude: /node_modules/,
                query: { presets: ['latest'] }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),      // 被编译的HTML文件路径 
            filename: path.resolve(__dirname, 'build/index.html'),  // 编译后的HTML文件存放路径
            inject: 'body',      // 编译后的js被插入HTML的body中。
            title: 'webpack is great!', //可以通过模板引入HTML文件中。
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
