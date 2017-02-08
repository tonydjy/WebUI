angular.module("tvapp.service",[]).factory("ApiClient", [
	'$http',
	function($http){
	var remote = {
		get: function(url){
			var responsePromise = $http({
			url: url,
			method: 'GET'
			});
        	return responsePromise;
		}
	}
	return {
        sayHello:function(){
        	var url =  "http://120.77.83.147:8080/RestApi/rest/hello"; 
            return remote['get'](url);
        }
    }

}]);