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
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var _this=this;
        //点击登录按钮
        $('#submit').click(function(){
            _this.submit();
        })
        //如果按下回车也提交
        $('.user-content').keyup(function(e){
            if(e.keyCode===13){ 
                _this.submit();
            }
        })
    },
    submit:function(){
        var formData={
            username:$.trim($('#username').val()),
            password:$.trim($('#password').val())
        }
        //表单验证结果
        validateResult = this.formValidate(formData);
        //前端表单不为空验证成功，就去请求登录的服务
        if(validateResult.status){ 
            _user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg); //请求失败的错误信息
            });
        }else{
            //验证失败，用户名和密码为空的时候
            formError.show(validateResult.msg);
        }
    },
    //表单的字段验证
    formValidate: function(formData){
        var result = {
            status : false,
            msg:''
        }
        //为空验证，_mm.validate验证返回value的布尔值，为空返回false
        //validate: function(value,type){if('require' === type){return !!value;}}
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证返回正确提示
        result.status = true;
        result.msg = '验证成功';
        return result;
    }
}
$(function(){
    page.init();
})