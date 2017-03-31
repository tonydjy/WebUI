angular.module("tvapp").controller("MyController",[
	"$rootScope",
	"$scope",
	"$timeout",
	"ApiClient",
	'$location',
	function($rootScope, $scope, $timeout, apiClient, location){
		/*
		 * if login successfully, reset the profile- menu and navigation-menu
		 */
		$rootScope.$on("loginsuccess", function(event, args){
			console.log("login success!");
			location.path("/");
		});

}]);