'use strict';

angular.module('twitterDashboardApp').controller('home', ['$scope', '$window', function($scope, $window) {
	$window.scope = $scope;
    // List of tags in angular
	$scope.tags = [];
	attachFollowHashTag();
}]);
