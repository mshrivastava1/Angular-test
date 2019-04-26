(function() {
'use-strict'
var shoppingList1=["milk","egg","bread"];
var shoppingList2=[{
  name: "milk",
  quantity: "2"
},{
  name: "egg",
  quantity: "3"
},{
  name: "bread",
  quantity: "3"
}];
var app = angular.module("shoppingList",[]);
app.controller("ShoppingListController",shoppingListController);
shoppingListController.$inject=['$scope'];
function shoppingListController($scope){
$scope.shoppingList1 = shoppingList1;
$scope.shoppingList2 = shoppingList2;

$scope.add = function () {
var newItem = {
  name: $scope.itemName,
  quantity: $scope.itemQuantity
};

shoppingList2.push(newItem);
};
$scope.remove = function () {
alert("h");
  for(var i =0; i<shoppingList2.length;i++)
  {

if($scope.itemName.match(shoppingList2[i].name))
      {
          console.log(shoppingList2[i].name);
          console.log(shoppingList2[i]);
      shoppingList2.splice(i,1);
      }
}
};

$scope.add = function () {
    var newItem = {
      name: $scope.itemName,
      quantity: $scope.itemQuantity
    };

  shoppingList2.push(newItem);
  }
};

})();
