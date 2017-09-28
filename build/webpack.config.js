var path = require('path');
var fs=require('fs');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var glob=require('glob');
var htmlPath=path.normalize(__dirname+'/../src/views/*.html');
var pathDir=path.normalize(__dirname+'/../src/views/');
var entryPath=path.normalize(__dirname+'/../src/js/*.js');
var entryPathDir=path.normalize(__dirname+'/../src/js/');
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        //pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[basename]=entry;
    }
    return entries;
}
var entrys=getEntry(entryPath,entryPathDir);
var config={
    entry: Object.assign(entrys, {
        // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包
        'vendor': ['jquery']
    }),
    output: {
        filename: "[name].js",//打包后的文件名
        path: path.normalize(__dirname+'/../dist'),//打包文件存放的绝对路径
        publicPath: "../"//网站运行时的访问路径。
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
    resolve:{
        extensions: [ '.js'],
        alias: {
            jquery:path.normalize(__dirname+'/../node_modules/jquery/dist/jquery.js')
        }
    },
    plugins: [
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
        new CommonsChunkPlugin({
            name: 'vendor',
            filename:'libs.js'
        })
    ]
};

console.log(path.normalize(__dirname+'/../node_modules/jquery/dist/jquery.js'))
var files=getEntry(htmlPath,pathDir);
for (var value in files){
    var l=new HtmlwebpackPlugin({
        title: 'Hello World',
        filename: 'html/'+value+'.html',   // 生成出来的文件和路径，前面会加上output的path
        template: 'src/views/'+value+'.html',   // 获取最初的html末班
        inject:  'body',          // 插入文件的位置
        hash: true,
        chunks:['vendor',value]
        // 在生成的文件后面增加一个hash，防止缓存
        /*minify:{ //压缩HTML文件
         removeComments:true,    //移除HTML中的注释
         collapseWhitespace:true    //删除空白符与换行符
         }*/
    });
    config.plugins.push(l)
}

module.exports=config;
