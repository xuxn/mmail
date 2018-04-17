require('./index.css');
var _mm=require('util/mm.js');
//一个是登录注册的问题， 一个是购物车数量的问题
var _user=require('service/user-service.js');
var _cart=require('service/cart-service.js');
var nav={
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登录、注册、退出都用事件的方式写
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        $('.js-register').click(function(){
            window.location.href='./user-register.html';
        });
        //退出需要请求后端，然后让后端把登录状态删掉，调用后端就需要service
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();  //登出成功
            },function(errMsg){
                _mm.errorTips(errMsg); //登出失败
            })
        });

    },
    //初始化的时候会读取下用户的信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        },function(errMsg){
            //do nothing
        })
    },
    //购物车数量
    loadCartCount: function(){
        _cart.getCartCount(function(res){
             $('.nav .nav-count').text(res || 0);
        },function(errMsg){
            $('.nav .nav-count').text(0);
        })
    }
}
module.exports=nav.init();