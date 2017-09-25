const autoprefixer=require('autoprefixer')
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
module.exports={
    entry: {
        build:"./main.js",
        index:'./index.js'
    },
    output: {
        filename: "[name].js",//打包后的文件名
        path: __dirname + '/assets/',//打包文件存放的绝对路径
        //publicPath: "/assets/"//网站运行时的访问路径。
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
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({    //压缩代码
         compress: {
         warnings: false
         },
         except: ['$super', '$', 'exports', 'require']    //排除关键字
         }),*/
        // 内联css提取到单独的styles的css
        new ExtractTextPlugin("index.css")
    ]

};
const htmlArray = ['index','login'];
htmlArray.forEach(function (index,value) {
    var newPlugin=new HtmlwebpackPlugin({
        title: 'Hello World',
        filename: value+'.html',   // 生成出来的文件和路径，前面会加上output的path
        template: 'src/views/'+value+'.html',   // 获取最初的html末班
        inject:  'body',          // 插入文件的位置
        hash: true,               // 在生成的文件后面增加一个hash，防止缓存
        /*minify:{ //压缩HTML文件
         removeComments:true,    //移除HTML中的注释
         collapseWhitespace:true    //删除空白符与换行符
         }*/
    });
    module.exports.plugins.push(newPlugin);
})


