const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const glob = require('glob-all');
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
//分离css，webpack4推荐的分离css的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// js文件的压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");

const webpackConfigBase = require('./webpack.base.conf');

const webpackConfigProd = {
    mode: 'production', // 通过 mode 声明生产环境
    devtool: 'cheap-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        filename: 'js/[name].[hash].js',
        publicPath: './'
    },
    module: {
        rules: []
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                // sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        //删除dist目录
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '..'),
            dry: false // 启用删除文件
        }),
        //静态资源输出
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, "../src/assets"),
            to: './assets',
            ignore: ['.*']
        }]),
        //将css分离出去
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].min.css"
        }),
        // 消除冗余的css代码
        new purifyCssWebpack({
            paths: glob.sync(
                [
                    path.resolve(__dirname, "../src/**/*.html"), 
                    path.resolve(__dirname, "../src/**/*.js")
                ]
            )
        }),
    ],


}
module.exports = merge(webpackConfigBase, webpackConfigProd);