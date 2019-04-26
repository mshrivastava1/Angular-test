(function (){
'use-strict';

var app = angular.module("filterModule",[]);
app.controller("filterController",filterController);
app.filter("changeMessage",changeMessageFilter);

filterController.$inject=['$scope','changeMessageFilter'];

function filterController($scope,changeMessageFilter)
{
$scope.message = "This is the example for customFilter";
};


function changeMessageFilter()
{
  return function(input,target,replace)
  {
    input = input || ""
    input=input.replace(target,replace);
    return input;
  }
}

})();
