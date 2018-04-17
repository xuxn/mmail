 
require('./index.css');

// var _mm=require('../../../util/mm.js'); //这样路径很麻烦，所以在webpack.config.js里配置下
var _mm=require('util/mm.js');
// _mm.request({
//     url: '/v2/movie/in_theaters',  //请求一个豆瓣热映电影的接口，但是跨域问题请求不成功
//     success: function(res){
//         console.log(res);
//     },
//     error : function(errMsg){
//         console.log(errMsg);
//     }
// })
// console.log(_mm.getUrlParam('test'));

// var html = "<div>{{data}}</div>";
// var data = {
//     data : 123
// }
// console.log(_mm.renderHtml(html,data)); 
require('page/common/nav/index.js'); 
require('page/common/header/index.js');
require('util/slider/index.js'); 
var templateBanner=require('./banner.string');  

$(function(){
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);

    // 初始化banner, 定义jquery 对象时前面加一个$
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next'; 
        //调用unslider的方法，并用forward作为参数
        //data() 方法向被选元素附加数据，或者从被选元素获取数据, 语法：$(selector).data(name)，所以下面语句的意思是执行prev()或者next()方法
        $slider.data('unslider')[forward]();
    });
})
 