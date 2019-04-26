(function (){
  'use strict'

  var app = angular.module('NameCalculator',[]);

  app.controller('NamecalCulatorController',function($scope){
    $scope.name = "";
    $scope.totalValue=0;
    $scope.displayNumeric = function(){
      var totalNameValue=calculateNameValue($scope.name);
      $scope.totalValue=totalNameValue;
      console.log("------------printing the passed name "+$scope.name);
    }

    function calculateNameValue(string)
    {
      var calculatedTotalValue=0;
      for(var i=0;i<string.length;i++)
      {

        calculatedTotalValue +=string.charCodeAt(i);
        console.log(calculatedTotalValue);
      }
      return calculatedTotalValue;
    }

  });
})();
