webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(117);


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

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	__webpack_require__(110);

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

	window.console&&console.warn("This version of Unslider is due to be deprecated by December 1. Please visit unslider.com for details on how to upgrade."),function(t,s){if(!t)return s;var i=function(){this.el=s,this.items=s,this.sizes=[],this.max=[0,0],this.current=0,this.interval=s,this.opts={speed:500,delay:3e3,complete:s,keys:!s,dots:s,fluid:s};var i=this;this.init=function(s,i){return this.el=s,this.ul=s.children("ul"),this.max=[s.outerWidth(),s.outerHeight()],this.items=this.ul.children("li").each(this.calculate),this.opts=t.extend(this.opts,i),this.setup(),this},this.calculate=function(s){var e=t(this),n=e.outerWidth(),h=e.outerHeight();i.sizes[s]=[n,h],n>i.max[0]&&(i.max[0]=n),h>i.max[1]&&(i.max[1]=h)},this.setup=function(){if(this.el.css({overflow:"hidden",width:i.max[0],height:this.items.first().outerHeight()}),this.ul.css({width:100*this.items.length+"%",position:"relative"}),this.items.css("width",100/this.items.length+"%"),this.opts.delay!==s&&(this.start(),this.el.hover(this.stop,this.start)),this.opts.keys&&t(document).keydown(this.keys),this.opts.dots&&this.dots(),this.opts.fluid){var e=function(){i.el.css("width",Math.min(Math.round(i.el.outerWidth()/i.el.parent().outerWidth()*100),100)+"%")};e(),t(window).resize(e)}this.opts.arrows&&this.el.parent().append('<p class="arrows"><span class="prev">芒鈥犅�</span><span class="next">芒鈥犫€�</span></p>').find(".arrows span").click(function(){t.isFunction(i[this.className])&&i[this.className]()}),t.event.swipe&&this.el.on("swipeleft",i.prev).on("swiperight",i.next)},this.move=function(s,e){this.items.eq(s).length||(s=0),0>s&&(s=this.items.length-1);var n=this.items.eq(s),h={height:n.outerHeight()},o=e?5:this.opts.speed;this.ul.is(":animated")||(i.el.find(".dot:eq("+s+")").addClass("active").siblings().removeClass("active"),this.el.animate(h,o)&&this.ul.animate(t.extend({left:"-"+s+"00%"},h),o,function(){i.current=s,t.isFunction(i.opts.complete)&&!e&&i.opts.complete(i.el)}))},this.start=function(){i.interval=setInterval(function(){i.move(i.current+1)},i.opts.delay)},this.stop=function(){return i.interval=clearInterval(i.interval),i},this.keys=function(s){var e=s.which,n={37:i.prev,39:i.next,27:i.stop};t.isFunction(n[e])&&n[e]()},this.next=function(){return i.stop().move(i.current+1)},this.prev=function(){return i.stop().move(i.current-1)},this.dots=function(){var s='<ol class="dots">';t.each(this.items,function(t){s+='<li class="dot'+(1>t?" active":"")+'">'+(t+1)+"</li>"}),s+="</ol>",this.el.addClass("has-dots").append(s).find(".dot").click(function(){i.move(t(this).index())})}};t.fn.unslider=function(s){var e=this.length;return this.each(function(n){var h=t(this),o=(new i).init(h,s);h.data("unslider"+(e>1?"-"+(n+1):""),o)})}}(window.jQuery,!1);

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(118); 
	__webpack_require__(99); 
	__webpack_require__(104);
	__webpack_require__(107); 
	var _mm=__webpack_require__(95);
	var _product = __webpack_require__(120);
	var templateIndex=__webpack_require__(121); 

	var page={
	    data:{
	        listParam : {
	            keyword         : _mm.getUrlParam('keyword')    || '',
	            categoryId      : _mm.getUrlParam('categoryId') || '',
	            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
	            pageNum         : _mm.getUrlParam('pageNum')    || 1,
	            pageSize        : _mm.getUrlParam('pageSize')   || 20
	        }
	    },
	    init:function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad:function(){
	        this.loadList();
	    },
	    bindEvent:function(){

	    },
	    //加载list数据
	    loadList:function(){
	        var _this =this;
	        var listParam=this.data.listParam;
	        var listHtml = '';
	        listParam.categoryId 
	            ? (delete listParam.keyword) : (delete listParam.categoryId);
	        //获取产品数据
	        _product.getProductList(listParam,function(res){
	            listHtml = _mm.renderHtml(templateIndex,{
	                list: res.list
	            }),
	            $(".p-list-con").html(listHtml);
	            _this.loadPagination(res.data.pageNum,res.data.pages);
	        },function(errMsg){
	            _mm.errorTips(errMsg);
	        })
	        
	    },
	    //加载分页信息
	    loadPagination:function(pageNum,pages){

	    }
	}
	$(function(){
	    page.init();
	})

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

	var _mm=__webpack_require__(95);

	var _product = { 
	    //获取商品列表
	    getProductList:function(listParam,resolve, reject){
	        _mm.request({
	            url : _mm.getServerUrl('/product/list.do'), 
	            data : listParam,  
	            success : resolve,  
	            error : reject
	        })
	    }
	}
	module.exports= _product;

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

	module.exports = "here";

/***/ })

});