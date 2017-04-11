angular.module("tvapp").controller("loginController",[
	"$rootScope",
	"$scope",
	"$timeout",
	"ApiClient",
	"Cache",
	function($rootScope, $scope, $timeout, apiClient, cache){

		$scope.submit = function() {
			  authbody ={
					  "name":$scope.user.name,
					  "password":$scope.user.password
			  }
		      var promise = apiClient.authUser(authbody);
		      promise.then(function(response){
		        try{
		          if(response.status == 200){
		        	  console.log("success login!");
		        	  $rootScope.$broadcast("loginsuccess");
		        	  cache.setToken(response.data.token);
		          }
		        }catch(ex)
		        {
		          console.log(ex);
		        }
		        console.log(response);
		      })
		}
	}
])