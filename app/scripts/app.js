'use strict';

var angular = require('angular'),
    uiRouter = require('angular-ui-router');

// Primary module & dependencies
var app = angular.module('sketchbook', ['ui.router'] );

// State Management
app.config(function($stateProvider) {
  $stateProvider 
  // Home
  .state('main', {
    url: '/',
    templateUrl: './views/main.html'
  });
});
app.config(['$urlRouterProvider',
  function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }
]);

// Controllers
app.controller('MainCtrl', function($scope) {
});

app.controller('TestCtrl', function($scope) {
  $scope.test = 'lol';
});