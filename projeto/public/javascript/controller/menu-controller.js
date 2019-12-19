var app = angular.module("boticarioApplication", []); 
app.controller("menuController", ["$scope", "$rootScope", "$http", "$timeout", "$window",     function($scope, $rootScope, $http, $timeout, $window) {
	$scope.error = false;
	$scope.success = false;
    $scope.found = false;
   
	//CAPTURA TOKEN JWT PARA ENVIAR NA REQUISIÇÃO REST
    var token = $window.localStorage.getItem('tokens');
	console.log('token='+token);
	$scope.userToken = token;
	var tokenName = $window.localStorage.getItem('tokenName');
	console.log('tokenName='+tokenName);
	$scope.tokenName = tokenName;

	
	
	$scope.cleanAlerts = function() {
		$scope.success=false;
		$scope.error=false;
	}
	
	
	$scope.goToResellers = function() {
	        window.open('http://localhost:3000/resellerscrud?token='+$scope.userToken, "_self");

			
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
	
    }
    
    $scope.goToPurchases = function() {
	        window.open('http://localhost:3000/purchasescrud?token='+$scope.userToken, "_self");

			
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
	
	}
	
}]);
