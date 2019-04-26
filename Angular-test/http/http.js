(function (){
  'use-strict';

  var app = angular.module('http',[])
  app.controller('MenuCategoriesController',MenuCategoriesController)
  app.service('MenuCategoriesService',MenuCategoriesService)
  app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


  MenuCategoriesController.$inject = ['MenuCategoriesService']
  function MenuCategoriesController(MenuCategoriesService){
    var menu = this;
    
    var promise = MenuCategoriesService.getMenuCategories();

    promise.then(function (response){
      menu.categories = response.data;
      console.log(menu.categories);

    })
    .catch(function (error){
      console.log("something terrible has happened");
    })

    menu.logMenuItems = function(shortName,index){
      var promise = MenuCategoriesService.getMenuForCategories(shortName);

      promise.then(function(response){
        menu.subCategories = response.data;
        console.log(!menu.categories[index].active);
           menu.categories[index].active = !menu.categories[index].active;
        menu.collapseAnother(index);
      }).catch(function(error){
        console.log(error);
      })
    };

    menu.collapseAnother = function(index){
        for(var i=0; i<menu.categories.length; i++){
            if(i!=index){
                menu.categories[i].active = false;
            }
        }
    };
  };

  MenuCategoriesService.$inject = ['$http','ApiBasePath']
  function MenuCategoriesService($http,ApiBasePath){
    var service = this;

    service.getMenuCategories = function(){
      var response = $http({
        method: "GET",
        url: (ApiBasePath+"/categories.json")
      });
      return response;
    }

    service.getMenuForCategories = function (shortName){
      var response = $http({
        method: "GET",
        url: (ApiBasePath+"/menu_items.json"),
        params: {
          category: shortName
        }
      });
      return response;
    }

  };


})();
