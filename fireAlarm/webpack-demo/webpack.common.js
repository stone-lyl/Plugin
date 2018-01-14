const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// common: html加载js，clean，entry，output
module.exports = {
    entry: __dirname + "/app/main.js", // 唯一入口文件
    output: {
        path: __dirname + "/build", // 打包后文件存放的地方
        filename: "bundle-[hash].js" // 打包后输出文件的文件名
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: { loader: "babel-loader" },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, //指定启用css modules
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require('autoprefixer')],
                            browser: ['last 5 versions']
                        }
                    }
                    /* css-loader end */
                ]
            }
        ]
        /* rules end */
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" // new 这个插件实例，并传入相关的参数
        }),
        new CleanWebpackPlugin("build/*.*", {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
}