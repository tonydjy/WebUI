angular.module("tvapp").controller("productController",[
	"$scope",
	"$timeout",
	"ApiClient",
	function($scope, $timeout, apiClient){
	
    $scope.addProduct = function(){
    	var text = $scope.product.trim();
    	addProductPromise(text);
    }

   $scope.delete = function(product){
	   deleteProductPromise(product);
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
    
    var addProductPromise = function(product){

        var promise = apiClient.addProduct(product);
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
    
    var deleteProductPromise = function(product){

        var promise = apiClient.deleteProduct(product);
        promise.then(function(response){
          try{
            if(response.status == 200){
                var index = $scope.productList.indexOf(product)
                $scope.productList.splice(index,1);
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