'use strict';
(function(angular){
  //默认angular提供的异步请求对象不支持自定义函数名，豆瓣不支持angular随机分配的函数名
  var http=angular.module('moviecat.services.http',[]);
  http.service('HttpService',['$window','$document',function($window,$document){
    this.jsonp=function(url,data,callback){
      //0将data转换成url字符串的形式{id:1,name:'zhangsan'} ==> id=1$name=zhangsan
      //1处理url中的回调参数
      // url += callback = jdkag(随机函数名)

      
      var querystring=url.indexOf('?')==-1?'?':'&';
      for(var key in data){
        querystring+=key+'='+data[key]+'&';
      }
      var FnSuffix =Math.random().toString().replace('.','');
      var cbFuncName='my_json_cb'+FnSuffix;
      querystring+='callback='+cbFuncName;
      //2创建一个script标签
      var scriptElement=$document[0].createElement('script');
      scriptElement.src=url+querystring;
      //3挂载回调函数
      $window[cbFuncName]=function(data){
        callback(data);
        $document[0].body.removeChild(scriptElement);
      }
      //4将此标签放到页面中
      $document[0].body.appendChild(scriptElement);
    }
  }]);
})(angular);
