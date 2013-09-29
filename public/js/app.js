'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home',
      controller: 'homeCtrl'
    }).
    when('/create', {
      templateUrl: 'partials/create',
      controller: 'createCtrl'
    }).
    when('/about', {
      templateUrl: 'partials/about',
      controller: 'aboutCtrl'
    }).
    when('/browse', {
      templateUrl: 'partials/browse',
      controller: 'browseCtrl'
    }).
    when('/decks/:deck_id', {
      templateUrl: 'partials/view',
      controller: 'viewCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
