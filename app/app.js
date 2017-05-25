'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
    'ngRoute',
    'moviecat.movie_detail',
    'moviecat.movie_list',
    'moviecat.directives.auto_focus',
  ])
  .constant('AppConfig',{     //为模块定义一些常量
    pageSize:10,
    listApiAddress:'http://api.douban.com/v2/movie/',
    detailApiAddress:'http://api.douban.com/v2/movie/subject/'
  })
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
  }])
  .controller('SearchController',['$scope','$route','AppConfig',function($scope,$route,AppConfig){
    $scope.input='';    //取search文本框的输出
    $scope.search=function(){
      //console.log($scope.input);
      $route.updateParams({category:'search',q:$scope.input});
    };//此操作可以写个指令，更通用
  }]);
