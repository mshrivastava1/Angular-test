(function (){
  'use-strict';

  var app = angular.module('shoppingCenter',[])
  app.controller('ShoppingListController',ShoppingListController)
  app.factory('ShoppingListFactory',ShoppingListFactory)
  app.directive('shoppingList', ShoppingListDirective);


  function ShoppingListDirective() {
    var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        items: '=myList'
      },
      // controller: 'ShoppingListDirectiveController as list',
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function ShoppingListDirectiveController() {
    var list = this;

    list.cookiesInList = function () {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }

      return false;
    };

  };
  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory) {
    var list = this;
    var shoppingList = ShoppingListFactory();
    list.items = shoppingList.getItems();
    list.itemName = "";
    list.quantity = "";

    list.addItem = function (){

      try{
        shoppingList.add(list.itemName,list.quantity)
      }catch(error){
        list.errorMessage = error.message;
      }

    }
  };

  function ShoppingListService(maxItems) {

    var service = this;

    var items = [];
    service.add = function (name,quantity){
        console.log("inside the add functiuon")
      console.log(name+"of "+quantity)
      if((maxItems===undefined) ||
      (maxItems!==undefined) && (items.length < maxItems)){
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
      }else{
      throw new Error("Can not exceed"+maxItems+" items");
      }
    }
    service.getItems = function (){
      console.log("inside the get items")
      return items;
    }
  }

  function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
