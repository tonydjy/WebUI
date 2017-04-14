var tvapp = angular.module("tvapp", [
					'tvapp.service',   
					'ngRoute',
					'ngAnimate',
]).config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/admin',{
			templateUrl: '/views/admin.html',
			controller:'productController'
		})
		.when('/test',{
			templateUrl: '/views/test.html',
			controller:'MyController'
		})
		.when('/login',{
			templateUrl: '/views/login.html',
			controller:'loginController'
		})	
		.when('/',{
			templateUrl: '/views/login.html',
			controller:'loginController'
		})


	
}]).config(function($httpProvider){
    $httpProvider.interceptors.push('httpInterceptor');
});