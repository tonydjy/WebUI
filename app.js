var tvapp = angular.module("tvapp", [
					'tvapp.service',   
					'ngRoute',
					'ngAnimate',
]).config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: '/views/admin.html',
			controller:'MyController'
		})
		.when('/test',{
			templateUrl: '/views/test.html',
			controller:'MyController'
		})

	
}]);