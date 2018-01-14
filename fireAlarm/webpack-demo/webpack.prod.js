const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require('./webpack.common');

module.exports = merge(common, {
    plugins: [
        new webpack.BannerPlugin("版权不是我的啊啊啊！"),
        new UglifyJsPlugin({
            sourceMap: true,
        }),
    ],
})