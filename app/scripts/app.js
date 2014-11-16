'use strict';

var angular = require('angular');

var app = angular.module('sketchbook', [] );

app.controller('HelloCtrl', function($scope) {
  $scope.test = 'lol';
});