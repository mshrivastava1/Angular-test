(function(){
 'use-strict';

var app = angular.module("watcher",[]);
app.controller("watchCounter",watchCounter)

watchCounter.$inject = ['$scope']
function watchCounter($scope)
{
  $scope.onceCounter = 0;
  $scope.incrementedCounter=0;
  $scope.numberOfWatchers = function (){

    console.log("Number of watchers: ",$scope.$$watchersCount);
  };
  $scope.countOnce = function()
  {
    $scope.onceCounter = 1;
  };

  $scope.showIncrementedCounter = function()
  {
    $scope.incrementedCounter = $scope.incrementedCounter+1;
  };
  $scope.$watch('onceCounter', function(oldvalue,newvalue){
    console.log("old value: ",oldvalue);
    console.log("new value: ",newvalue);
  });
  $scope.$watch('incrementedCounter', function(oldvalue,newvalue){
    console.log("counter old value: ",oldvalue);
    console.log("counter new value: ",newvalue);
  });
}


})();
