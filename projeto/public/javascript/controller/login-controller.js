var app = angular.module("boticarioApplication", []); 
app.controller("loginController", ["$scope", "$rootScope", "$http", "$timeout", "$window", "loginService",  function($scope, $rootScope, $http, $timeout, $window, loginService) {
	$scope.error = false;
	$scope.success = false;
    $scope.found = false;
    
	$scope.cleanAlerts = function() {
		$scope.success=false;
		$scope.error=false;
	}
	
	
	$scope.login = function() {
		
			
            var user = {};
            user.username = $scope.username;
            user.passwd = $scope.passwd;
            console.log(user);
			loginService.login(user).then(function(response) {
				console.log("data");
				console.log(response.data);
				
				$scope.userAuth = response.data[0];
				console.log($scope.userAuth);
                     
			if(angular.isDefined($scope.userAuth)){
				console.log($scope.userAuth.id );
				loginService.register($scope.userAuth).then(function(response) {
					$scope.userToken = response.data
					console.log("$scope.userToken");
					console.log($scope.userToken);

					//TOKEN JWT NA SESSAO
					$window.localStorage.setItem('tokens',  $scope.userToken);
					$window.localStorage.setItem('tokenName',  $scope.username);

					window.open('http://localhost:3000/menu?token='+$scope.userToken, "_self");
					

				}, function errorCallback(response) {
					$scope.error=true;
					$scope.alertMessage = "Not found";
				});
				$timeout(function() {
					$scope.cleanAlerts();
				},5000);
			
			}else{
				console.log("usuario e senha nao existem no banco");
				$scope.error=true;
				$scope.alertMessage = "Usuário e senha não existem no banco";
				$timeout(function() {
					$scope.cleanAlerts();
				},5000);
			}
				
				
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Not found";
			});
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
	
	}
	
}])
