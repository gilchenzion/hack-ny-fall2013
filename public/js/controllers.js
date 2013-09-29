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
      }).
      error(function (data, status, headers, config) {
        console.log("error");
      });

    $scope.recent = function() {

    }

    $scope.editors = function() {

    }

  }).
  controller('createCtrl', function ($scope, $rootScope, $http, $location) {
      $scope.publish = function(deck) {
	      var real_deck = {
		title: $scope.title,
                description: $scope.description,
                numOfCards: deck.nouns.length + deck.adjs.length,
	        numOfNouns:deck.nouns.length,
	  	numOfAdjs: deck.adjs.length,
	  	numOfVotes:0,
	  	tags: [],
	  	nounCards:deck.nouns,
	  	adjCards:deck.adjs,
	  	generated:false,
	  	editorsPick:false
	      };
	      console.log(real_deck.title);
	      $http({
		method: 'POST',
		url: '/decks/create',
		params: real_deck
	      }).
	      success(function (data, status, headers, config) {
		$rootScope.newDeck = data;
		  $location.path("/");
	      }).
	      error(function (data, status, headers, config) {
		console.log("error");
	      });
      }
  }).
  controller('viewCtrl', function ($scope, $rootScope, $route, $routeParams, $http, $location) {
      $http({
        method: 'GET',
        url: '/deck/' + $routeParams.deck_id
      }).
      success(function (data, status, headers, config) {
        $rootScope.deck = data;
        console.log(data);
      }).
      error(function (data, status, headers, config) {
        console.log("error");
	$location.path('/')
      });

  }).
  controller('aboutCtrl', function ($scope) {
    // write Ctrl here

  });
