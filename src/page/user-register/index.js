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
//注册逻辑
var page={
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        $("#submit").click(function(){
            _this.register();
        })
        $(".user-content").keyup(function(e){
            if(e.keyCode === 13){
                _this.register();
            }
        })
        //异步验证用户名是否存在
        $("#username").blur(function(){
            var username = $.trim($(this).val());
            //如果用户名为空不做验证
            if(!username){
                return;
            }
            _user.checkUsername(username,function(){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            })
        })
    }, 
    register:function(){ 
        var _this = this;
        var formData={
            username : $.trim($("#username").val()),
            password : $.trim($("#password").val()),
            passwordConfirm : $.trim($("#password-confirm").val()),
            phone : $.trim($("#phone").val()),
            email : $.trim($("#email").val()),
            question : $.trim($("#question").val()),
            answer : $.trim($("#answer").val())
        }
        
        var validateResult = _this.validate(formData);
        
        if(validateResult.status){
            //请求后台注册
            _user.register(formData,function(){
                window.location.href = './result.html?type=register';
            },function(msg){
                formError.show(msg);
            })
            
        }else{ 
            formError.show(validateResult.msg);
        }
    },
    validate : function(formData){
        var result = {
            status : false,
            msg:''
        }
        //所有的非空验证
        if(!_mm.validate(formData.username,'require')){
            result.msg = "用户名不能为空";
            return  result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = "密码不能为空";
            return  result;
        }
        // 密码长度不能少于6位
        if(formData.password.length < 6){
            result.msg = "密码长度不能少于六位";
            return  result;
        }

        if(!_mm.validate(formData.passwordConfirm,'require')){
            result.msg = "确认密码不能为空";
            return  result;
        }

        //两次密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = "两次密码不一致";
            return  result;
        }

        if(!_mm.validate(formData.phone,'require')){
            result.msg = "手机号不能为空";
            return  result;
        }

        //验证手机
        if(!(_mm.validate(formData.phone, 'phone'))){
            result.msg = "手机格式不正确";
            return  result;
        }

        if(!_mm.validate(formData.email,'require')){
            result.msg = "邮箱不能为空";
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