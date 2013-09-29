'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function ($scope, $http, $location) {

    $scope.isActive = function(route) { 
        return route === $location.path();
    };

}).
controller('browseCtrl', function ($scope, $http, $rootScope, $location) {
    $http({
        method: 'GET',
        url: '/decks',
    }).
    success(function (data, status, headers, config) {
        $rootScope.decks = data.result;

        console.log(data);
    }).
    error(function (data, status, headers, config) {
        console.log("error");
    });

    $scope.vote = function(id) {
        console.log("Voting...");
        $http({
            method: 'POST',
            url: '/deck/vote/' + id
        }).
        success(function (data, status, headers, config) {
            console.log("Voted");
        }).
        error(function (data, status, headers, config) {
            console.log("Errord");
        });
    }
}).
controller('homeCtrl', function ($scope, $http, $rootScope, $location) {
    console.log("In home controller.");
    $scope.submit = function() {
        $scope.loading = true;

        $http({
            method: 'GET',
            url: '/decks/generate',
            params: {q: $scope.formText,
                adjs: 30, max_nouns: 30}
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
	console.log("In create control...");
if (!$scope['newDeck']) {
	$scope.newDeck = {};
	$scope.newDeck.adjs = [];
	$scope.newDeck.nouns = [];
}
    $scope.addAdjective = function(deck) {
	    deck.adjs.unshift('New Card');
    }
    $scope.addNoun = function(deck) {
	    deck.nouns.unshift('New Card');
    }
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

    $scope.printFuckYou = function() {
	    console.log("Hey yo!");
	    print();
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

    $scope.printFuckYou = function() {
	    console.log("Hey yo!");
	    print();
    }
}).
controller('aboutCtrl', function ($scope) {
});
