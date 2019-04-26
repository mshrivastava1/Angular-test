(function(){
'use-strict';

var app = angular.module('MsgApp',[]);

app.controller('MessageController',MessageController);

MessageController.$inject=['$scope'];

function MessageController($scope)
{
  $scope.name = "Mayank";
  $scope.message = function ()
  {
    return printMessage($scope.name);
  };

  function printMessage(string)
  {
    return string+"has something to say";
  };
}


})();
