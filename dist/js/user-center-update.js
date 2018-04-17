webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(136);


/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	var _mm=__webpack_require__(95);
	//一个是登录注册的问题， 一个是购物车数量的问题
	var _user=__webpack_require__(102);
	var _cart=__webpack_require__(103);
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

/***/ }),

/***/ 100:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

	//因为请求，所有mm工具类也是需要的
	var _mm=__webpack_require__(95);

	var _cart = { 
	    //获取购物车数量
	    getCartCount :function(resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
	            success : resolve,  
	            error : reject
	        })
	    }
	}
	module.exports= _cart;

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(105);
	var _mm=__webpack_require__(95); 
	//通用页面头部
	var header={
	    init:function(){
	        this.onload();
	        this.bindEvent(); 
	    },
	    onload:function(){
	        //搜索回填，进入到搜索结果list页面以后，keyword值改变，回填就是在header刚加载进来的时候读以下url信息，把内容填进去
	       var keyword= _mm.getUrlParam('keyword');
	       if(keyword){
	            $('.search-input').val(keyword);
	       } 
	    },
	    bindEvent:function(){
	        //点击搜索
	        var _this=this;
	        $('#search-btn').click(function(){
	            _this.searchSubmit();
	        })
	    },
	    //搜索的提交
	    searchSubmit:function(){
	        var keyword = $.trim($('.search-input').val());
	        if(keyword){
	            window.location.href= "./list.html?keyword="+keyword;
	        }else{
	            _mm.goHome();
	        }
	    }
	}
	header.init(); // header不需要输出什么，不需要外部调用，可以直接header.init()调用

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(132);
	var _mm=__webpack_require__(95); 
	var templateIndex=__webpack_require__(134); 
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

/***/ }),

/***/ 132:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 134:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\n{{#isActive}}\n    <li class=\"nav-item active\">\n{{/isActive}}\n{{^isActive}}\n    <li class=\"nav-item\">\n{{/isActive}}\n        <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\n    </li>\n{{/navList}}";

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(137);
	__webpack_require__(99); 
	__webpack_require__(104); 
	var _mm=__webpack_require__(95);
	var _user=__webpack_require__(102);
	var navSide=__webpack_require__(131); 
	var templateIndex = __webpack_require__(139);

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

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

	module.exports = "<div class=\"user-info\">\n    <div class=\"form-line\">\n        <span class=\"label\">用户名：</span>\n        <span class=\"text\">{{username}}</span>\n    </div>\n    <div class=\"form-line\">\n        <span class=\"label\">电 话：</span>\n        <input class=\"input\" id=\"phone\" autocomplete=\"off\" value=\"{{phone}}\" />\n    </div>\n    <div class=\"form-line\">\n        <span class=\"label\">邮 箱：</span>\n        <input class=\"input\" id=\"email\" autocomplete=\"off\" value=\"{{email}}\" />\n    </div>\n    <div class=\"form-line\">\n        <span class=\"label\">问 题：</span>\n        <input class=\"input\" id=\"question\" autocomplete=\"off\" value=\"{{question}}\" />\n    </div>\n    <div class=\"form-line\">\n        <span class=\"label\">答 案：</span>\n        <input class=\"input\" id=\"answer\" autocomplete=\"off\" value=\"{{answer}}\" />\n    </div>\n    <span class=\"btn btn-submit\">提交</span>\n</div>";

/***/ })

});