angular.module("tvapp").controller("loginController",[
	"$rootScope",
	"$scope",
	"$timeout",
	"ApiClient",
	function($rootScope, $scope, $timeout, apiClient){

		$scope.submit = function() {
		    if ($scope.person.name == 'aaa') {
		    	$rootScope.$broadcast("loginsuccess");
		    }
		}
	}
])