(function(){

'use strict';

var app = angular.module('MyFirstApp',[]);

app.controller('MyFirstController', function ($scope){
 $scope.name="Mayank";
 $scope.sayHello = function()
 {
   return "Hello Mayank";
 };
});

})();
