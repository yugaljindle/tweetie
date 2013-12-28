'use strict';

angular.module('twitterDashboardApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
