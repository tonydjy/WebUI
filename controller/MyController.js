angular.module("tvapp").controller("MyController",[
	"$scope",
	"$timeout",
	"ApiClient",
	function($scope, $timeout, apiClient){
	$scope.person = {"name":"Tony"};

	$scope.click = function(){
		getServerPromise();
	}

	var getServerPromise = function(){

      var promise = apiClient.sayHello();
      promise.then(function(response){
        try{
          if(response.status == 200){
             $scope.person.name = response.data.name;
          }
        }catch(ex)
        {
          console.log(ex);
        }
        console.log(response);
      })
    };

}]);