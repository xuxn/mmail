require('./index.css');
require('page/common/nav/index.js'); 
require('page/common/header/index.js'); 
var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var navSide=require('page/common/nav-side/index.js'); 
var templateIndex = require('./index.string');

//登录逻辑
var page={
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        navSide.init({name:"user-center"});
        this.loadUserInfo();
    },
    bindEvent:function(){  
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            } 
            validateResult = _this.validateForm(userInfo); 
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function(res){ 
                    window.location.href = './user-center.html';
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    loadUserInfo:function(){
        var userHtml = "";
        _user.getUserInfo(function(res){ 
            userHtml=_mm.renderHtml(templateIndex,res);
            $(".panel-body").html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    },
    validateForm:function(formData){
        var result = {
            status : false,
            msg:''
        }  
        //验证手机
        if(!(_mm.validate(formData.phone, 'phone'))){
            result.msg = "手机格式不正确";
            return  result;
        }  
        //验证邮箱
        if(!(_mm.validate(formData.email, 'email'))){
            result.msg = "邮箱格式不正确";
            return  result;
        }

        if(!_mm.validate(formData.question,'require')){
            result.msg = "提示问题不能为空";
            return  result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = "提示答案不能为空";
            return  result;
        } 

        result.status = true;
        result.msg = '验证成功';
        return result;
    }
}
$(function(){
    page.init();
})