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
    when('/custom', {
      templateUrl: 'partials/custom',
      controller: 'customCtrl'
    }).
    when('/about', {
      templateUrl: 'partials/about',
      controller: 'aboutCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
