/**
*手写一个跨域组件
*/

(function(window,document,undefined){
  'use strict';
  var jsonp=function(url,data,callback){
    //0将data转换成url字符串的形式{id:1,name:'zhangsan'} ==> id=1$name=zhangsan
    var querystring=url.indexOf('?')==-1?'?':'&';
    for(var key in data){
      querystring+=key+'='+data[key]+'$';
    }
    //1处理url中的回调参数
    // url += callback = jdkag(随机函数名)
    var FnSuffix =Math.random().toString().replace('.','');
    var cbFuncName='my_json_cb'+cbFuncName;
    querystring+='callback='+cbFuncName;
    //2创建一个script标签
    var scriptElement=document.createElement('script');
    scriptElement.src=url+querystring;
    //此时还不能将其append到页面
    //3挂载回调函数
    window[cbFuncName]=callback;
    //4将此标签放到页面中
    document.body.appendChild(scriptElement);
  }
  window.$jsonp=jsonp;
})(window,document);
