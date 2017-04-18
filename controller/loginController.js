angular.module("tvapp").controller("loginController",[
	"$rootScope",
	"$scope",
	"$timeout",
	"ApiClient",
	"Cache",
	function($rootScope, $scope, $timeout, apiClient, cache){
		$scope.showloginbox = true;
		$scope.showsignbox = false;
		$scope.showLoginWarning = false;
		$scope.warning_info = "Username or Password invalid";
		$rootScope.$on("loginfailed", function(event, args){
			console.log("login failed!");
			$scope.showLoginWarning = true;
			$scope.user.name = "";
			$scope.user.password = "";
		});
		
		$scope.focusInput = function(){
			$scope.showLoginWarning = false;
		}
		
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
		
		$scope.showSignUp = function(){
			$scope.showloginbox = !$scope.showloginbox;
		}
	}
])