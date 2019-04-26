(function (){
'use-strict';

var app = angular.module('Binding',[]);

app.controller('BindingController',bindingController);

bindingController.$inject=['$scope'];

function bindingController($scope){

  $scope.numberOfWatchers = function (){

    console.log("Number of watchers: ",$scope.$$watchersCount);
  };

$scope.logFirstName = function (){
$scope.firstName = "Mayank";
  }
$scope.setFullName = function (){

  $scope.fullname = $scope.firstName + " "+ "Shrivastava";
}
}


})();
