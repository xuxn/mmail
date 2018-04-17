const path=require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack=require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置，dev/online, process是nodejs里面的一个对象
var WEBPACK_ENV = process.env.WEBPACK_ENV|| 'dev';

//获取html-webapck-plugin的参数的方法
var getHtmlConfig=function(name,title){
    return { 
        template : './src/view/'+name+'.html', // 页面模板
        filename : 'view/'+name+'.html',   //输出文件的名字， 即输出到dist/view/index.html
        title    : title,
        inject   : true,    //注入方式，不用手写js和css的引入，这个插件会自动引入到html文件里
        hash     : true,    //会在引入的css和js文件后加入版本号
        chunks   : ['common',name]   //需要引入的模块，也就是会引入base.js ,index.js或者login.js
    }
}
var config={
    entry:{
        'common':['./src/page/common/index.js'], //chunck的名字叫common
        'index':['./src/page/index/index.js'],
        'list':['./src/page/list/index.js'],
        'user-login':['./src/page/user-login/index.js'],
        'user-register':['./src/page/user-register/index.js'],
        'result':['./src/page/result/index.js'],
        'user-center':['./src/page/user-center/index.js'],
        'user-center-update':['./src/page/user-center-update/index.js'],
        'user-pass-update':['./src/page/user-pass-update/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js']
    },
    module: {
		loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }, 
            { test: /\.(jpg|png|gif|eot|woff|svg|ttf)\??.*$/, loader: 'url-loader?limit=100&name=/resouce/[name].[ext]'},
            // 限制文件大小，超过100K, 小于这个值就会以base64的形式在css中引入， 大于就以源文件的形式引入，然后放到对应的目录下，[ext]是保留扩展名
            { test: /\.string$/, loader:'html-loader'}
		]
    },
    resolve:{
        alias : {
            util : __dirname + '/src/util', //__dirname表示当前的根目录
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            images : __dirname + '/src/images',
            node_modules: __dirname + '/node_modules'
        }
    }, 
    // 解决路径繁琐问题
    output:{
        path: './dist', //存放文件的路径
        publicPath: '/dist', //访问文件时的路径
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    plugins: [
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //独立通用模块到base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common', //存的名字,本身提供的一个方式
            filename:'js/base.js' //最后输出的一个name
        }),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('list','产品列表')),
	]
}

if('dev' === WEBPACK_ENV ){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088')
} 
//到线上是判断不是dev环境，就不加载这个模块

module.exports=config;