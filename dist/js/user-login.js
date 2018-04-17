webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(140);


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

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(141);
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

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});