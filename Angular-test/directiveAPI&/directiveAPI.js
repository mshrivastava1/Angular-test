(function (){
  'use-strict';

  var app = angular.module("directiveApi",[]);
  app.controller("ShoppingListController1",ShoppingListController1);
  // app.controller("ShoppingListController2",ShoppingListController2);
  app.factory("ShoppingListFactory",ShoppingListFactory);
  app.directive("shoppingList",ShoppingListDirective);

  function ShoppingListDirective() {
      var ddo = {
        templateUrl : 'shoppingList.html',
        scope: {
          items : "<",
          myTitle : '@title',
          onRemove: '&'
        },
        controller: ShoppingListDirectiveController,
        controllerAs: 'list',
        bindToController: true
      };
      return ddo;
  }

  function ShoppingListDirectiveController() {
    var list = this;

    list.cookiesInList = function (){
      for(var i =0; i<list.items.length;i++)
      {
        var name = list.items[i].name;
        if(name.toLowerCase().indexOf("cookies")!==-1)
        {
            return true;
        }
        else{
          return false
        }
      }
    }
  }
  ShoppingListController1.$inject = ["ShoppingListFactory"];
  function ShoppingListController1(ShoppingListFactory)
  {
    var list = this;
    var shoppingList = ShoppingListFactory();
    list.items = shoppingList.getItems();
    list.itemName = "";
    list.itemQuantity = "";
    var origTitle = "Shopping List #1";
    list.title = origTitle + " (" + list.items.length + " items )";

    list.addItem = function (){
      shoppingList.add(list.itemName,list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " items )";
    };

    list.removeItem = function(itemIndex){
    //  this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      console.log(list.items.length);
      shoppingList.remove(itemIndex);
      this.title = origTitle + " (" + list.items.length + " items )";
    }
  }

  // ShoppingListController2.$inject = ['ShoppingListFactory'];
  // function ShoppingListController2 (ShoppingListFactory){
  //   var list2 = this;
  //   var shoppingList = ShoppingListFactory(3);
  //   list2.items = shoppingList.getItems();
  //   list2.itemName = "";
  //   list2.itemQuantity = "";
  //   list2.addItem = function()
  //   { console.log("inside the add function of second controller")
  //     try{
  //       shoppingList.add(list2.itemName,list2.itemQuantity);
  //     }catch(error){
  //       list2.errorMessage = error.message;
  //     }
  //   }
  //   list2 .removeItem = function (itemIndex){
  //     shoppingList.remove(itemIndex);
  //   }
  // }

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
