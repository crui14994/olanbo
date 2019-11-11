const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpackConfigBase = require('./webpack.base.conf');


const webpackConfigDev = {
    mode: 'development', // 通过 mode 声明开发环境
    devtool: "cheap-module-eval-source-map",
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    devServer: {
        /*新增*/
        clientLogLevel: 'warning',
        quiet: true,
        watchOptions: {
            poll: false,
        },
        compress: true,
        /*新增结束*/
        contentBase: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        host: "192.168.101.56",
        port: "9090",
        overlay: true, // 浏览器页面上显示错误
        // open: true, // 开启浏览器
        hot: true,//热加载
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ],

}
module.exports = merge(webpackConfigBase, webpackConfigDev);