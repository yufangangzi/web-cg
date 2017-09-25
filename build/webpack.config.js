var path = require('path');
var fs=require('fs');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
var pluginsHtml=require('./htmlPlugin.js');
var pluginsHtmls=[
    /*new webpack.optimize.UglifyJsPlugin({    //压缩代码
     compress: {
     warnings: false
     },
     except: ['$super', '$', 'exports', 'require']    //排除关键字
     }),*/
    // 内联css提取到单独的styles的css
    new ExtractTextPlugin("css/[name].css"),
    /*new AssetsPlugin({
     filename: 'assets/webpack.assets.js',
     processOutput: function (assets) {
     return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
     }
     }),*/
];
pluginsHtmls=pluginsHtmls.concat(pluginsHtml)
module.exports={
    entry: {
        login:"./src/js/main.js",
        index:'./src/js/index.js'
    },
    output: {
        filename: "[name].js",//打包后的文件名
        path: path.normalize(__dirname+'/../dist'),//打包文件存放的绝对路径
        publicPath: "/dist/"//网站运行时的访问路径。
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {test: /.(png|jpg)$/, loader: 'url-loader?limit=8192'}

        ]
    },
    plugins: pluginsHtmls


};

