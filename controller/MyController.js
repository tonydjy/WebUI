angular.module("tvapp").controller("MyController",[
	"$scope",
	"$timeout",
	"ApiClient",
	function($scope, $timeout, apiClient){
	
    $scope.addProduct = function(){
    	var text = $scope.product.trim();
            if(text) {
               $scope.productList.push(
                    text
               );
               $scope.text = '';
       }
    }

   $scope.delete = function(product){
          var index = $scope.productList.indexOf(product)
          $scope.productList.splice(index,1);
   }

	var getProductListPromise = function(){

      var promise = apiClient.getProductList();
      promise.then(function(response){
        try{
          if(response.status == 200){
             $scope.productList = response.data.ProductList;
          }
        }catch(ex)
        {
          console.log(ex);
        }
        console.log(response);
      })
    };
    
    var init = function(){
    	getProductListPromise();
    }
    init();

}]);