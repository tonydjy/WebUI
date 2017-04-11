angular.module("tvapp.service",[]).factory("ApiClient", [
	'$http',
	'Cache',
	function($http, cache){
	var remote = {
		get: function(url){
			var responsePromise = $http({
			url: url,
			method: 'GET',
			headers: {
				'x-auth-token': cache.getToken()
			}
			});
        	return responsePromise;
		},
		post: function(url, body) {
			var responsePromise = $http({
				url: url,
                method: 'POST',
				headers: {
					'x-auth-token': cache.getToken()
				},
                data: body
			});

			return responsePromise;
		},

		put: function(url, body){
	         var responsePromise = $http({
	             url:url,
	             method: 'PUT',
				headers: {
					'x-auth-token': cache.getToken()
				},
	             data: body
	           });
	         	return responsePromise;
	     },
         
         delete: function(url){
	         var responsePromise = $http({
	             url:url,
	             method: 'DELETE',
				headers: {
					'x-auth-token': cache.getToken()
				}
	         });
         	return responsePromise;
         }
	}
	return {
        getProductList:function(){
        	var url =  "http://120.77.83.147:8080/RestApi/rest/product/getProductList"; 
            return remote['get'](url);
        },
		addProduct:function(product){
			var url =  "http://120.77.83.147:8080/RestApi/rest/product/addProduct"; 
			return remote['post'](url, product);
		},
		deleteProduct:function(product){
			var url =  "http://120.77.83.147:8080/RestApi/rest/product/deleteProduct?product=" + product; 
			return remote['delete'](url, product);
		},
		authUser:function(body){
			var url =  "http://120.77.83.147:8080/RestApi/rest/user/auth" ; 
			return remote['post'](url, body);
		}
    }

}]);