'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http, $location) {

    $scope.isActive = function(route) { 
      return route === $location.path();
    };

  }).
  controller('homeCtrl', function ($scope, $http, $rootScope, $location) {

    $scope.submit = function() {
      console.log($scope.formText);

      $http({
        method: 'GET',
        url: '/decks/generate',
        params: {q: $scope.formText,
          adjs: 10, max_nouns: 30}
      }).
      success(function (data, status, headers, config) {
        $rootScope.newDeck = data;
        console.log(data);
          $location.path("/create");
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });

    }
  }).
  controller('createCtrl', function ($scope, $rootScope) {
    // write Ctrl here
  }).
  controller('aboutCtrl', function ($scope) {
    // write Ctrl here

  });
