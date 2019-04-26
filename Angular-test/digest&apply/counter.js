(function () {
'use-strict';

var app = angular.module("counter",[]);
app.controller("counterController",counterController);

counterController.$inject = ['$scope','$timeout'];
function counterController($scope,$timeout)
{
  $scope.counter=0;
  $scope.upCounter = function()
  {
    $timeout(function (){
      $scope.counter++;
      console.log("Counter has incremented!")
    },2000)

      // setTimeout(function(){
      //   $scope.$apply(function(){
      //     $scope.counter++;
      //     console.log("counter has incremented");
      //   }
      //   );
      //
      // },2000);

    // setTimeout(function(){
    //   console.log("counter has incremented");
    //   $scope.counter++;
    //   $scope.$digest();
    // },2000);
  }

}


})();
