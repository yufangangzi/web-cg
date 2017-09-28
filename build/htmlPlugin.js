var path = require('path');
var fs=require('fs');
var glob=require('glob');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var htmlPath=path.normalize(__dirname+'/../src/views/*.html');
var pathDir=path.normalize(__dirname+'/../src/views/');
var pluginsHtml=[];
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = [],
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        //pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries.push(basename);
    }
    return entries;
}
var files=getEntry(htmlPath,pathDir);
files.forEach(function(value){
    var l=new HtmlwebpackPlugin({
        title: 'Hello World',
        filename: 'html/'+value+'.html',   // 生成出来的文件和路径，前面会加上output的path
        template: 'src/views/'+value+'.html',   // 获取最初的html末班
        inject:  'body',          // 插入文件的位置
        hash: true,
        chunks:[value]
        // 在生成的文件后面增加一个hash，防止缓存
        /*minify:{ //压缩HTML文件
         removeComments:true,    //移除HTML中的注释
         collapseWhitespace:true    //删除空白符与换行符
         }*/
    });
    pluginsHtml.push(l)
})

module .exports=pluginsHtml