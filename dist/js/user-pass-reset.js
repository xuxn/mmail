webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(143);


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

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(144);
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

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});