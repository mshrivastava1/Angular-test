(function(){
  'use-strict';

  var app = angular.module("customDirectives",[]);
  app.controller("ShoppingListController1",ShoppingListController1);
  app.controller("ShoppingListController2",ShoppingListController2);
  app.factory("ShoppingListFactory",ShoppingListFactory)
  app.directive('listItemDescription',ListItemDescription)
  app.directive('listItem',ListItem);

  function ListItem(){

    var ddo = {
      templateUrl: 'listItem.html'
    };
    return ddo;
  }

  function ListItemDescription(){

    var ddo = {
      template: '{{ item.quantity }} of {{ item.name }}'
    }

    return ddo;
  };


  ShoppingListController1.$inject = ["ShoppingListFactory"];
  function ShoppingListController1(ShoppingListFactory)
  {
    var list = this;
    var shoppingList = ShoppingListFactory();
    list.items = shoppingList.getItems();
    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function (){
      shoppingList.add(list.itemName,list.itemQuantity);
    };

    list.removeItem = function(itemIndex){
      shoppingList.remove(itemIndex);
    }
  }

  ShoppingListController2.$inject = ['ShoppingListFactory'];
  function ShoppingListController2 (ShoppingListFactory){
    var list = this;
    var shoppingList = ShoppingListFactory(3);
    list.items = shoppingList.getItems();
    list.itemName = "";
    list.itemQuantity = "";
    list.addItem = function()
    { console.log("inside the add function of second controller")
      try{
        shoppingList.add(list.itemName,list.itemQuantity);
      }catch(error){
        list.errorMessage = error.message;
      }
    }
    list .removeItem = function (itemIndex){
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
  function ShoppingListFactory()
  {
    var factory = function (maxItems)
    {
      return new ShoppingListService(maxItems);
    };
    return factory;
  };


})();
