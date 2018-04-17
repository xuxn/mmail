require('./index.css');
var _mm=require('util/mm.js'); 
//通用页面头部
var header={
    init:function(){
        this.onload();
        this.bindEvent(); 
    },
    onload:function(){
        //搜索回填，进入到搜索结果list页面以后，keyword值改变，回填就是在header刚加载进来的时候读以下url信息，把内容填进去
       var keyword= _mm.getUrlParam('keyword');
       if(keyword){
            $('.search-input').val(keyword);
       } 
    },
    bindEvent:function(){
        //点击搜索
        var _this=this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        })
    },
    //搜索的提交
    searchSubmit:function(){
        var keyword = $.trim($('.search-input').val());
        if(keyword){
            window.location.href= "./list.html?keyword="+keyword;
        }else{
            _mm.goHome();
        }
    }
}
header.init(); // header不需要输出什么，不需要外部调用，可以直接header.init()调用