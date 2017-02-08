angular.module("tvapp").controller("MyController",[
	"$scope",
	"$timeout",
	"ApiClient",
	function($scope, $timeout, apiClient){
	$scope.product = {"name":"Miumiu"};

	$scope.click = function(){
		getServerPromise();
	}
        $scope.add = function(){
            var text = $scope.product.name.trim();
            if(text) {
               $scope.productList.push({
                    name:text
                });
               $scope.text = '';
            }
        }

        $scope.productList = [{
              name:'GUCCI'
        },{
              name:' BUBBERY '
        }];

        $scope.delete = function(product){
             var index = $scope.productList.indexOf(product)
             $scope.productList.splice(index,1);// 起删除的作用
         }

	var getServerPromise = function(){

      var promise = apiClient.sayHello();
      promise.then(function(response){
        try{
          if(response.status == 200){
             $scope.product.name = response.data.name;
          }
        }catch(ex)
        {
          console.log(ex);
        }
        console.log(response);
      })
    };

}]);