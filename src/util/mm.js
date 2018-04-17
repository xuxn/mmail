var conf={
    serverHost: '', //接口地址和当前的静态文件地址是一样的，所以直接用空
}
var Hogan = require('hogan.js');
var _mm={
    //网络请求
    request:function(param){  //param是一个对象，如果什么都不传，只传个url这个请求也能发生
        var _this=this;
        $.ajax({
            type     : param.method || 'get',  //是get方法还是post方法
            url      : param.url || '',
            dataType : param.type || 'json',  //数据接口
            data     : param.data || '',    //请求时需要的数据
            success  : function(res){   //请求成功的处理，表示的是请求的成功，不一定是数据请求的成功
                //res.status为0表示是成功的
                if(0===res.status){//接口请求成功，res.status是接口里的定义
                    typeof param.success === 'function' && param.success(res.data, res.msg); //判断是不是function, 如果是就回调
                }else if(10 === res.status){ //没有登录状态，需要强制登录 
                    //因为在ajax里所以取不到_mm对象，所以赋值_this
                     _this.doLogin();
                }
                else if (1 === res.status){ //接口请求到了，但是提交给后台的数据是错的
                    //调用error的回调, error就没有res.data了
                    typeof param.error === 'function' && param.error(res.msg);  
                }
            }, //表示的请求与否，只有在请求正常，并且请求的内容也是正常的时候，才认为是成功的
            error    : function(err){ //接口请求失败的处理，比如404，503，err的对象
                typeof param.error === 'function' && param.error(err.statusText); 
            } 
        })
    },
    //封装统一登录
    doLogin:function(){
        //从哪里跳到登录页，再返回到哪个页面，所以加redirect
        //window.location.href可能有特殊字符，传的时候可能会截断，所以用encodeURIComponent编码
        window.location.href="./user-login.html?redirect="+encodeURIComponent(window.location.href);//从哪儿进去的登录页还需要返回去，所以加参数，再处理完登录以后再跳回去
    },
    //获取后端的接口地址
    getServerUrl:function(path){
        return conf.serverHost  + path;
    },
    //获取URL的参数
    getUrlParam:function(name){
        //happmail.com/list?keyword='xxx'&page=1, 我们要获取的就是keyword='xxx'&page=1
        // 以空或者&开始，加上=关键字name,再加上n个非&字符，最后以&结束
        var reg =new RegExp('(^|&)'+name + '=([^&]*)(&|$)');  
        //location.search是从当前URL的?号开始的字符串, substr(1)就是把？去掉，然后匹配正则，返回一个数组。
        var result= window.location.search.substr(1).match(reg);
        //decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
        return result ? decodeURIComponent(result[2]) : null;
    },
    //hogan渲染HTML模板
    renderHtml:function(htmlTemplate,data){
        //hogan先编译再渲染，封装一个方法把这两步合到一步，简化render流程
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data); 
        return result;
    },
    //成功提示，错误提示， 这种提示用于当页或者当页的ajax成功了也可以用这种提示，这里把成功和失败分成两个提示，这两种提示的方式是不一样的
    successTips: function(msg){
        alert(msg || '操作成功');
    },
    errorTips: function(msg){
        alert(msg || '哪里不对了');
    },
    validate: function(value,type){
        //字段的验证，支持非空，手机，邮箱的判断
        var value = $.trim(value); 
        // 非空
        if('require' === type){
            return !!value; //把value强转成布尔型， 假如value有值，返回true, 为空返回false
        }
        // 手机
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 跳回主页
    goHome: function(){
        window.location.href= './index.html';
    }

}
module.exports=_mm;