// __dirname 是node.js一个全局变量，指向当前执行的脚本所在文件目录。
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const eslintfriendlyformatter = require("eslint-friendly-formatter");

module.exports = {
    entry: __dirname + "/app/main.js", // 唯一入口文件
    output: {
        path: __dirname + "/build", // 打包后文件存放的地方
        filename: "bundle-[hash].js" // 打包后输出文件的文件名
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },
    devServer: {
        contentBase: "./public", // 服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        port: 3030,
        hot: true
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        cache: true,
                        formatter: eslintfriendlyformatter,
                        fix: true
                    }
                }
            },
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
                    { loader: "postcss-loader" }
                    /* css-loader end */
                ]
            }
        ]
        /* rules end */
    },
    plugins: [
        new webpack.BannerPlugin("版权不是我的啊啊啊！"),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" // new 这个插件实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), // 加热插件        
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: "[name].js.map",
            exclude: ["vendor.js"]
        }),  //设置source-map

        new UglifyJsPlugin({
            sourceMap: true,
        }),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin("build/*.*", {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
}