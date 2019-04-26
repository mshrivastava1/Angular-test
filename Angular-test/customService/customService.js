(function(){
'use strict';

var app = angular.module("ShoppingList", []);
app.controller("ShoppingListAddController",ShoppingListAddController);
app.controller("ShoppingListShowController",ShoppingListShowController);
app.service("ShoppingListService",ShoppingListService);

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService){
  var itemAdder = this;

  itemAdder.name = "mayank";
  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";
  itemAdder.add = function(){
        console.log("calling add function");
        ShoppingListService.add(itemAdder.itemName,itemAdder.itemQuantity);
      };

};

ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService){

    var showList = this;

    showList.items = ShoppingListService.getItems();
    showList.remove = function (index)
    {
      ShoppingListService.remove(index);
    }
}

function ShoppingListService(){

  var service = this;
  var items = [];
  service.add = function (itemName,itemQuantity) {
      var item = {
        name : itemName,
        quantity : itemQuantity
      };
      items.push(item);
      console.log(items);
    };

    service.remove = function (index){
      items.splice(index,1);
    }

service.getItems = function ()  {
  console.log("inside the get item function");
      return items;
    };
};


})();
