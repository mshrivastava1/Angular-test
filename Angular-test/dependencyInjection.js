(function () {

'use-strict';

var app = angular.module("DIApp",[]);

app.controller("DIController",DIController);

function DIController($scope,$filter){
  $scope.name="mayank"
  $scope.upperCase = function (){
    var uppCase = $filter('uppercase');
    $scope.name=uppCase($scope.name);
  };
};
console.log(DIController.toString());
console.log(DIController.get)
})();
