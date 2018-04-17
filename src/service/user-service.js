//因为请求，所有mm工具类也是需要的
var _mm=require('util/mm.js');

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