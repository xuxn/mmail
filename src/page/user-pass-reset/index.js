require('./index.css');
require('page/common/nav-simple/index.js');

var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
}
//登录逻辑
var page={
    data :{
        username : '',
        question : '',
        answer : '',
        token : ''
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad :function(){
        this.loadStepUserName();
    },
    bindEvent:function(){
        var _this=this;
        //点击第一步的下一步按钮
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                //请求后台的密码提示问题
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res; 
                    _this.loadStepQuestion();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips('请输入用户名');
            }
        })
        //点击密码提示问题的下一步按钮
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val()); 
            if(answer){
                //请求后台的密码提示问题
                _user.checkAnswer({
                    username: _this.data.username,
                    question:_this.data.question,
                    answer :answer
                },function(res){   
                    _this.data.answer = answer;
                    _this.data.token = res; 
                    _this.loadStepPasword();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips('请输入密码提示问题');
            }
        })
        //更新密码
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val()); 
            if(password && password.length>=6){
                //请求后台的密码提示问题
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken :_this.data.token, 
                },function(res){   
                    window.location.href="./result.html?type=passReset"; 
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips('请输入不少于6位的新密码');
            }
        }) 
    },  
    //加载输入用户名的第一步
    loadStepUserName : function(){
        $('.step-username').show();
    },
    //加载密码提示问题
    loadStepQuestion : function(){
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
    },
    //加载密码提示答案
    loadStepPasword : function(){
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    },
}
$(function(){
    page.init();
})