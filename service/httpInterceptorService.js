'use strict';

angular.module("tvapp.service").factory('httpInterceptor', ['$rootScope','$q','$window', 'Cache', function($rootScope, $q, $window, cache) {
	var defer = defer || $q.defer();
	var interceptor = {
	'request': function(config) {
		var pathName = $window.location.pathname;
		pathName += '/';
		if(!(pathName.match("/$")=="/")){
			$window.location.pathname += "/";
			return $q.reject(config);
		}
		return config; 
	},
	'response': function(response) {
		var token = response.headers()['x-auth-token'];
		try{
			if(!_.isUndefined(token)){
				cache.setToken(token);
			}
		}
		catch(ex){
			console.error(ex.message);
		}
		return response;
	},
	'requestError': function(rejection) {
		return rejection; 
	},
	'responseError': function(rejection) {
		var promise = null;
		switch(rejection.status){
			case 419:
			case 401:{
				if(rejection.config.url.indexOf("/login") == -1){
					// ask for refresh content in page due to the re-login (e.g. remove the loading bar)
					$rootScope.$broadcast("loginfailed", null);
					 promise = defer.promise;
				}
				else{
					promise = $q.reject(rejection);
				}
				break;				
			}
			case 403: {
				promise = $q.reject(rejection);
				break;
			}
			default:
				promise = $q.reject(rejection);
		}
		return promise;
	}
};
	return interceptor;
}]);

