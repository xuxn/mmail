webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(149);


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	//因为请求，所有mm工具类也是需要的
	var _mm=__webpack_require__(95);

	var _user = {
	    //用户登录
	    login  : function(userInfo,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/login.do'),
	            data :userInfo,
	            method : 'POST',
	            success : resolve,  //业务传进来的， 请求成功
	            error : reject  //请求失败
	        })
	    },
	    //用户注册
	    register  : function(userInfo,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/register.do'),
	            data :userInfo,
	            method : 'POST',
	            success : resolve,  
	            error : reject 
	        })
	    }, 
	    //检查用户名是否合法
	    checkUsername : function(username,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/check_valid.do'),
	            data : {
	                type : 'username',
	                str  : username
	            },
	            method : 'POST',
	            success : resolve, 
	            error : reject  
	        })
	    }, 
	    logout : function (resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/logout.do'),
	            //这里是用户相关的信息，左右最好用post方法
	            method : 'POST',
	            success : resolve, 
	            error : reject  
	        })
	    },
	    //检查登录状态
	    checkLogin :function(resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/get_user_info.do'), //get_user_info.do是拿用户信息的一个接口
	            method : 'POST',
	            success : resolve, 
	            error : reject
	        })
	    },
	    //获取当前登录用户的详细信息
	    getUserInfo :function(resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/get_information.do'),  
	            method : 'POST',
	            success : resolve,   
	            error : reject
	        })
	    },
	    //更新个人信息
	    updateUserInfo : function(userInfo,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/update_information.do'), 
	            data : userInfo, 
	            method : 'POST',
	            success : resolve, 
	            error : reject
	        })
	    },
	    //更新密码
	    updatePass : function(userInfo,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/reset_password.do'), 
	            data : userInfo, 
	            method : 'POST',
	            success : resolve, 
	            error : reject
	        })
	    },
	    //请求用户密码提示问题
	    getQuestion : function(username,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/forget_get_question.do'), 
	            data : {
	                username:username
	            }, 
	            method : 'POST',
	            success : resolve,  
	            error : reject
	        })
	    },
	    //请求用户密码提示问题答案
	    checkAnswer : function(userInfo,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/forget_check_answer.do'), 
	            data : userInfo, 
	            method : 'POST',
	            success : resolve, 
	            error : reject
	        })
	    },
	    //设置新密码
	    resetPassword : function(userInfo,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/user/forget_reset_password.do'), 
	            data : userInfo, 
	            method : 'POST',
	            success : resolve, 
	            error : reject
	        })
	    }
	}
	module.exports= _user;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(126);

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(150);
	__webpack_require__(125);

	var _mm=__webpack_require__(95);
	var _user=__webpack_require__(102);
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

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});