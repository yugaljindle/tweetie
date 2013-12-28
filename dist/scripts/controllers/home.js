'use strict';

angular.module('twitterDashboardApp').controller('home', ['$scope', '$window', function($scope, $window) {
	$window.scope = $scope;
    // Tags entered
	$scope.tags = [];
    // Added form to add tags
	attachFollowHashTag();

    // To make OAuth calls to twitter
    // I understand this is insecure ( Only for demo )
    $window.cb = new Codebird;
    $window.cb.setConsumerKey("XjJEA1OJuzlbr5ZbQ1gcQ", "ywIcxyQ0rCjwcUCdhx1gizNLuSic0imxE4KF8WwWro");
    $window.cb.setToken("68297093-bxKc5rYXSnL6wCD4yq25W1F1g54GUz9Y7ygcCpN3G", "bJGpmsr0qKELQWB6rJY4NQfsTVvNyI4RIzpyFxUDgHEEt");

    // Update displayTags when new tags are entered
    $scope.$watch('tags', function(tags){
        $window.displayTags = tags;
    }, true);
    // Add shoutbox list
    addTweetieShoutboxList();
}]);
