//import webpackConfig from 'webpack.config.js'
var webpackConfig=require('./webpack.config.js');
var AssetsPlugin = require('assets-webpack-plugin');
var webpack=require('webpack');
var devServer={
    contentBase: "./",
    historyApiFallback:true,
    inline:true,
    hot:true
    };
webpackConfig.devServer=devServer;
webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

module.exports=webpackConfig
