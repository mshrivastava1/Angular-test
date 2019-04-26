(function (){
  'use-strict';

  var app = angular.module("scope",[])
  app.controller("ShoppingListController1",ShoppingListController1)
  app.controller("ShoppingListController2",ShoppingListController2)
  app.factory("ShoppingListFactory",ShoppingListFactory)
  app.directive("shoppingList",ShoppingList);

  function ShoppingList() {

    var ddo = {
      templateUrl: 'shoppinglist.html',
      scope: {
        list: '=myList',
        title: '@title'
      }
    };return ddo;
  }

  ShoppingListController1.$inject = ["ShoppingListFactory"];
  function ShoppingListController1(ShoppingListFactory)
  {
    var list1 = this;
    var shoppingList = ShoppingListFactory();
    list1.items = shoppingList.getItems();
    list1.itemName = "";
    list1.itemQuantity = "";
    list1.title="My ShoppingList #1 "+list1.items.length;

    list1.addItem = function (){
      shoppingList.add(list1.itemName,list1.itemQuantity);
      list1.title="My ShoppingList #1 "+list1.items.length;
    };

    list1.removeItem = function(itemIndex){
      shoppingList.remove(itemIndex);
      list1.title="My ShoppingList #1 "+list1.items.length;
    }
  }

  ShoppingListController2.$inject = ['ShoppingListFactory'];
  function ShoppingListController2 (ShoppingListFactory){
    var list2 = this;
    var shoppingList = ShoppingListFactory(3);
    list2.items = shoppingList.getItems();
    list2.itemName = "";
    list2.itemQuantity = "";
    list2.addItem = function()
    { console.log("inside the add function of second controller")
      try{
        shoppingList.add(list2.itemName,list2.itemQuantity);
      }catch(error){
        list2.errorMessage = error.message;
      }
    }
    list2 .removeItem = function (itemIndex){
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
