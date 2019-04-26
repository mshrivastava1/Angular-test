(function () {
'use-strict';

var app = angular.module('expression',[]);

app.controller('expresssionController',expresssionController);


expresssionController.$inject=['$scope'];

function expresssionController($scope)
{
$scope.name="Mayank";
$scope.stateOfBeing = "child";
$scope.sayMessage = function (){
  return "I want to change the image";
  }
$scope.clickImage = function ()
{

  $scope.stateOfBeing = "grownUp";

  alert($scope.stateOfBeing);
}

};

})();
