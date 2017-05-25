(function(angular){
  'use strict';

  //创建正在热映模块
  var module=angular.module('moviecat.in_theaters', ['ngRoute','moviecat.services.http'])

  //配置路由
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/in_theaters/:page', {
      templateUrl: 'in_theaters/view.html',
      controller: 'InTheatersController'
    });
  }]);

  module.controller('InTheatersController', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
    //$routeParams 路由的参数对象
    var count=8;   //每一页条数
    var page=parseInt($routeParams.page);   //当前第几页
    var start=(page-1)*count;   //当前页从哪开始
    //控制器分两步：1暴露数据；2暴露行为
    //$scope.subjects=data;
    //测试$http服务
    /*$http({
      method:
      url:
    }).then(function successfalCallback(response){

    },function errorCallback(response){

    });*/
    $scope.loading=true;
    $scope.subjects=[];
    $scope.title='';
    $scope.message='';
    $scope.totalCount=0;
    $scope.totalPages=0;
    $scope.currentPage=page;
    HttpService.jsonp('http://api.douban.com/v2/movie/in_theaters',{start:start,count:count},function(data){
      $scope.title=data.title;
      $scope.subjects=data.subjects;
      $scope.totalCount=data.total;
      $scope.totalPages=Math.ceil($scope.totalCount/count);
      $scope.loading=false;
      $scope.$apply();  //$applyd()的作用就是让所有指定的表达式的值重新同步
    });
    //暴露一个行为，用于控制页码
    $scope.goPage=function(page){
      if(page>=1&&page<=$scope.totalPages)
        $route.updateParams({page:page});
    };
    /*$http.get('doubanApiAddress').then(function(res){
      if(res.status==200){
        $scope.subjects=res.data.subjects;
      }else {
        $scope.message='错误'+res.statusText;
      }
    },function(err){
      $scope.message='错误'+err.statusText;
    });*/
  }]);
})(angular);
