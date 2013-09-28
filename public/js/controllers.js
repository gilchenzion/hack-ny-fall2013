'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

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

  }).
  controller('homeCtrl', function ($scope) {
    // write Ctrl here
    
  }).
  controller('createCtrl', function ($scope) {
    // write Ctrl here
    
  }).
  controller('aboutCtrl', function ($scope) {
    // write Ctrl here

  });
