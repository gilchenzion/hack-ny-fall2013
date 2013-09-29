'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http, $location) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

    $scope.isActive = function(route) { 
      return route === $location.path();
    };

  }).
  controller('homeCtrl', function ($scope) {
    
    $scope.submit = function() {
    
      $http({
        method: 'Get',
        url: '/api/decks/generate',
        params: '{text : $scope.formText}'
      }).
      success(function (data, status, headers, config) {
        console.log(data);
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });

    }
    
  }).
  controller('createCtrl', function ($scope) {
    // write Ctrl here
    
  }).
  controller('aboutCtrl', function ($scope) {
    // write Ctrl here

  });
