(function (){

  'use-strict';

  var app = angular.module("promise",[]);
  app.controller("ShoppingListController",ShoppingListController);
  app.service("ShoppingListService",ShoppingListService);
  app.service("WeightLossFilterService",WeightLossFilterService);

  ShoppingListController.$inject = ["ShoppingListService"]
  function ShoppingListController(ShoppingListService){

    var list = this;

    list.items = ShoppingListService.getItems();
    list.itemName = "";
    list.itemQuantity = "";
    list.add = function (){

      ShoppingListService.add(list.itemName,list.itemQuantity);

    };
  };

  ShoppingListService.$inject = ["$q","WeightLossFilterService"]
  function ShoppingListService($q,WeightLossFilterService){
    var service = this;

    var items = [];
    service.add = function (name,quantity){
      var namePromise = WeightLossFilterService.checkName(name);
      var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
      $q.all([namePromise,quantityPromise]).
      then(function (response){
        var item = {
          name: name,
          quantity: quantity
        };
        items.push(item);
      })
      .catch(function(errorResponse){
        console.log(errorResponse.message);
      })
    };

    service.getItems = function (){
      return items;
    }
  };



  WeightLossFilterService.$inject = ["$q","$timeout"]
  function WeightLossFilterService($q,$timeout){
  var service = this;

  service.checkName = function(name){
    //$q.defer() function creates the asynchronous environment for the function
    var deferred = $q.defer();

    var result = {
      message : ""
    };
    $timeout(function (){
    if(name.toLowerCase().indexOf('cookies')===-1)
    {
      deferred.resolve(result);
    }else{
      result.message = "Stop!!!!You can not shop for cookies";
      deferred.reject(result);
    }
  },3000);
    return deferred.promise;
  };


  service.checkQuantity = function (quantity){
    var deferred = $q.defer();

    var result = {
      message : ""
    };
    $timeout(function(){
      if(quantity<6)
      {
        deferred.resolve(result);
      }else{
        result.message = "stop!!! Enough for eating today";
        deferred.reject(result);
      }
    },1000)
    return deferred.promise;
  };
};

})();
