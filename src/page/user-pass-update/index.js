require('./index.css');
require('page/common/nav/index.js'); 
require('page/common/header/index.js'); 
var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var navSide=require('page/common/nav-side/index.js');  

//登录逻辑
var page={
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        navSide.init({name:"user-pass-update"}); 
    },
    bindEvent:function(){  
        var _this = this;
        $(document).on('click', '.btn-submit',function(){
            var userInfo = {
                password : $.trim($('#password').val()),
                passwordNew : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            } 
            validateResult = _this.validateForm(userInfo); 
            if(validateResult.status){
                _user.updatePass({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                },function(res,msg){ 
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips(validateResult.msg);
            }
        })
    }, 
    validateForm:function(formData){
        var result = {
            status : false,
            msg:''
        }  
        //验证密码为空
        if(!(_mm.validate(formData.password, 'require'))){
            result.msg = "旧密码不能为空";
            return  result;
        } 
        //新密码为空
        if(!(_mm.validate(formData.passwordNew, 'require'))){
            result.msg = "新密码不能为空";
            return  result;
        } 
        // 如果formData.passwordNew是一个undefined或者null, 再执行length会报错
        if(!formData.passwordNew.length || formData.passwordNew.length < 6){
            result.msg = "新密码长度不能少于6";
            return  result;
        }   

        if(formData.passwordConfirm !== formData.passwordNew){
            result.msg = "新密码不一致";
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