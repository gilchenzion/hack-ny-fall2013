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
      $scope.loading = true;
      
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

    $http({
        method: 'GET',
        url: '/decks',
        params: {sort_by: "vote"}
      }).
      success(function (data, status, headers, config) {
        $rootScope.voteDecks = data;
        console.log(data);
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });

      $http({
        method: 'GET',
        url: '/decks',
        params: {sort_by: "date"}
      }).
      success(function (data, status, headers, config) {
        $rootScope.dateDecks = data;
        console.log(data);
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });

      $http({
        method: 'GET',
        url: '/decks',
        params: {sort_by: "editorspick"}
      }).
      success(function (data, status, headers, config) {
        $rootScope.editorsDecks = data;
        console.log(data);
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });

    $scope.recent = function() {

    }

    $scope.editors = function() {

    }

  }).
  controller('createCtrl', function ($scope, $rootScope) {
    // write Ctrl here
  }).
  controller('aboutCtrl', function ($scope) {
    // write Ctrl here

  });
