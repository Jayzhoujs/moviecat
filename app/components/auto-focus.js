(function(angular){
  angular.module('moviecat.directives.auto_focus',[])
    .directive('autoFocus',['$location',function($location){
      //var path=$location.path();
      return{
        restrict:'A',
        link:function($scope,iElm,iAttrs,controllers){
          $scope.$location=$location;
          $scope.$watch('$location.path()',function(now){
            //监视path值，发生变化执行func
            var aLink=iElm.children().attr('href');
            var type=aLink.replace(/#(\/.+?)\/\d+/,'$1');
            //console.log(type);
            if (now.startsWith(type)) {
              // 访问的是当前链接
              iElm.parent().children().removeClass('active');
              iElm.addClass('active');
              //console.log(111);
            }
          })
          //iElm.on('click',function(){
          //  iElm.addClass('active');
          //});
        }
      };
    }]);
})(angular);
