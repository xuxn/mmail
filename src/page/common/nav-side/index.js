require('./index.css');
var _mm=require('util/mm.js'); 
var templateIndex=require('./index.string'); 
var navSide={
    option: {
        name : " ",
        navList : [
            {name : "user-center" , desc : "个人中心", href: "./user-center.html"},
            {name : "my-order" , desc : "我的订单", href: "./my-order.html"},
            {name : "user-pass-update" , desc : "修改密码", href: "./user-pass-update.html"},
            {name : "about-us" , desc : "关于MMail", href: "./about-us.html"}
        ]
    },
    init : function(option){
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav : function(){
        //计算active数据
        for(var i=0;i<this.option.navList.length;i++){
            if(this.option.navList[i].name==this.option.name){
                this.option.navList[i].isActive=true;
            }
        }
        //渲染list
        var navHtml = _mm.renderHtml(templateIndex,{navList:this.option.navList}); 
        $('.nav-side').html(navHtml);
    }
}
module.exports = navSide;