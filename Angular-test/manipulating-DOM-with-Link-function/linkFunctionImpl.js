(function () {
  'use-strict';

  var app = angular.module("LinkFunctionImpl",[])
  app.controller("ShoppingListController",ShoppingListController)
  app.factory("ShoppingListFacotry",ShoppingListFactory)
  app.directive("shoppingList",ShoppingListDirective);

  function ShoppingListDirective(){
    var ddo = {
      templateUrl: 'ShoppingList.html',
      scope: {
        items: '=',
        title: '@title',
        onRemove: '&'
      },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: ShoppingListDirectiveLink
    };
    return ddo;
  }

  function ShoppingListDirectiveLink(scope,element,attrs,controller){
    console.log("controller is ",controller);
    console.log("element is ",element);

    scope.$watch("list.cookiesInList()",function (newValue, oldValue) {
    console.log("Old value: ", oldValue);
    console.log("New value: ", newValue);
    if (newValue === true) {
    displayCookieWarning();
  }
  else {
    removeCookieWarning();
  }
    });
    function displayCookieWarning() {
    // Using Angluar jqLite
    // var warningElem = element.find("div");
    // console.log(warningElem);
    // warningElem.css('display', 'block');

    // If jQuery included before Angluar
    var warningElem = element.find("div");
    console.log(warningElem)
    warningElem.slideDown(9000);
  }


  function removeCookieWarning() {
    // Using Angluar jqLite
    // var warningElem = element.find("div");
    // warningElem.css('display', 'none');

    // If jQuery included before Angluar
    var warningElem = element.find("div.error");
    warningElem.slideUp(900);
  }

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
}
  ShoppingListController.$inject = ["ShoppingListFacotry"]
  function ShoppingListController(ShoppingListFacotry){
    var list = this;
    var shoppingList = ShoppingListFacotry();
    var origTitle = "Shopping List #1";
    list.name="";
    list.quantity="";
    list.items=shoppingList.getItems();
    list.title = origTitle + " (" + list.items.length + " items )";
    list.add = function (){
      console.log(list.quantity)
      shoppingList.add(list.name,list.quantity);
      list.title = origTitle + " (" + list.items.length + " items )";
    };
    list.remove = function(itemIndex){
      shoppingList.remove(itemIndex);
      list.title = origTitle + " (" + list.items.length + " items )";
    }

  }

  function ShoppingListService(maxItems){
    var service = this;
    items=[];

    service.add = function(name,quantity){

      if( (maxItems===undefined) || (maxItems!==undefined)&&(items.length<3))
      {
        var item = {
          name: name,
          quantity: quantity
        }
        items.push(item);
      }else{
        throw new Error("Max items (" + maxItems + ") reached.");
      }

    };

    service.remove = function(itemIndex){
      items.splice(itemIndex,1);
    }

    service.getItems = function (){
      return items;
    };

  }
  function ShoppingListFactory(){
    var factory = function(maxItems){
      return new ShoppingListService(maxItems);
    }
    return factory;
  }
})();
