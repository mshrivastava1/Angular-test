(function(){
  'use strict'

  var app = angular.module("ShoppingEventsApp",[])
  app.controller("ShoppingListController",ShoppingListController)
  app.factory("ShoppingListFactory",ShoppingListFactory)
  app.service('WeightLossFilterService', WeightLossFilterService)
  app.component("shoppingList",{
    templateUrl: "shoppingList.html",
    controller: ShoppingListComponentController,
    bindings: {
      items: "<",
      title: "@title",
      onRemove: "&"
    }
  })
  app.component("loadingSpinner",{
    templateUrl: 'spinner.html',
    controller: SpinnerController
  });

  SpinnerController.$inject = ["$rootScope"]
  function SpinnerController($rootScope){
    var $ctrl = this;
    console.log("inside the spinner controller")
    var cancelListener = $rootScope.$on('shoppinglist:processing', function (event, data) {
    console.log("Event: ", event);
    console.log("Data: ", data);

    if (data.on) {
      $ctrl.showSpinner = true;
    }
    else {
      $ctrl.showSpinner = false;
    }
  });
  $ctrl.$onDestroy = function () {
    cancelListener();
  };
  }


  ShoppingListComponentController.$inject=["$rootScope","$element","$q","WeightLossFilterService"]
  function ShoppingListComponentController($rootScope,$element,$q,WeightLossFilterService){
    var $ctrl = this;
    var totalItems;
    $ctrl.$onInit = function(){
      totalItems=0;
    }
    $ctrl.$doCheck = function(){
      if($ctrl.items.length !==totalItems){
        //$rootScope.$broadcast("shoppingList:processing",{on: true});
        $rootScope.$broadcast('shoppinglist:processing', {on: true});
        totalItems = $ctrl.items.length;
        //$rootScope.$broadcast("shoppingList:processing",{on: true});
        var promises = []
        for(var i=0;i<$ctrl.items.length;i++)
        {
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }
        $q.all(promises)
        .then(function (result) {
          // Remove cookie warning
          var warningElem = $element.find('div.error');
          warningElem.slideUp(900);
        })
        .catch(function (result) {
          // Show cookie warning
          var warningElem = $element.find('div.error');
          warningElem.slideDown(900);
        })
        .finally(function () {
          $rootScope.$broadcast('shoppinglist:processing', { on: false });
        });
      }
    }
    $ctrl.remove = function (myIndex){
      console.log("inside the remove")
      $ctrl.onRemove({index:myIndex});
    };
  }

  ShoppingListController.$inject = ["ShoppingListFactory"]
  function ShoppingListController(ShoppingListFactory){
    var list = this;
    var shoppingList = ShoppingListFactory();
    var origTitle = "ShoppingList #1"
    list.items = shoppingList.getItems();
    list.title = origTitle + " (" + list.items.length + " items )";

    list.itemName = "";
    list.quantity = "";

    list.addItem = function(){
        shoppingList.addItem(list.itemName,list.quantity);
        console.log(list.quantity)
        list.title = origTitle + " (" + list.items.length + " items )";
    };

    list.removeItem = function(itemIndex){
      shoppingList.removeItem(itemIndex);
      list.title = origTitle + " (" + list.items.length + " items )";
    }
  }


  function ShoppingListService(maxItems){
    var service = this;
    var items = [];

    service.addItem = function (itemName,quantity){

      if(maxItems===undefined || (maxItems!==undefined)&&(items.length<maxItems))
      {
        var item = {
          name: itemName,
          quantity: quantity
        };
        items.push(item);
      }else {
        throw new Error("Maxitems ("+maxItems+") reached.");
      };
    }
    service.removeItem = function(itemIndex){
      items.splice(itemIndex,1);
    };

    service.getItems = function(){
      return items;
    }
  };

  WeightLossFilterService.$inject = ["$q","$timeout"]
  function WeightLossFilterService($q,$timeout){
    var service = this;

    service.checkName = function (name){
      var deferred = $q.defer();
      var result = {
        message: ""
      }
      $timeout(function () {
        if(name.toLowerCase().indexOf('cookie') === -1)
        {
          console.log("functon retun value resolv",deferred.resolve(result))
          deferred.resolve(result)
        }else{
          result.message = "Warning Warning!!!!!!!Stay away from cookies";
          deferred.reject(result)
        }
      }, 3000);

      return deferred.promise;
    }
  }

  function ShoppingListFactory(){
    var factory = function (maxItems){
      return new ShoppingListService(maxItems);
    }
    return factory;
  };
})();
