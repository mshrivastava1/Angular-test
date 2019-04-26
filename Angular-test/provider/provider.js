( function () {
'use-strict';

var app = angular.module("provider",[]);

app.controller("shoppingListController",shoppingListController)
app.provider("shoppingList",shoppingListProvider);


shoppingListController.$inject = ['$scope','shoppingList']
function shoppingListController ($scope,shoppingList){
  var list = this;

  list.items = shoppingList.getItems();

  list.itemName = "";
  list.itemQuatity = "";

  list.add = function (){
    try{
      shoppingList.add(list.itemName,list.itemQuatity);
    }catch(error)
    {
        list.errorMessage = error.message;
    }
  };

  list.remove = function (itemIndex){
    shoppingList.remove(itemIndex);
  }

}

function ShoppingListService(maxItems)
{
  var service = this;
  var items = [];

  service.add = function(itemName,quantity){
    if((maxItems===undefined)||(maxItems!==undefined) && (items.length < maxItems))
    { 
      var item = {
        name : itemName,
        quantity : quantity
      };
      items.push(item);
    }
    else{
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  }

  service.remove = function(itemIndex){
    items.splice(itemIndex,1);
  };
  service.getItems = function ()
  {
    return items;
  }

}
function shoppingListProvider(){

var provider = this;

  provider.defaults = {
    maxItems: 10
  };

provider.$get = function (){
  var shoppingList = new ShoppingListService(provider.defaults.maxItems);
  return shoppingList;
  };
}
})();
