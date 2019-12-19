var app = angular.module("boticarioApplication", []); 
app.controller("resellerController", ["$scope", "$http", "$timeout", "$window", "resellerService",  function($scope, $http, $timeout, $window, resellerService) {
	$scope.error = false;
	$scope.success = false;
	$scope.found = false;
	$scope.option = -1;
	$scope.reseller = {};
	$scope.listOfResellers = [];

	//CAPTURA TOKEN JWT PARA ENVIAR NA REQUISIÇÃO REST
    var token = $window.localStorage.getItem('tokens');
	console.log('token local storage='+token);
	$scope.userToken = token;
	var tokenName = $window.localStorage.getItem('tokenName');
	console.log('tokenName='+tokenName);
	$scope.tokenName = tokenName;
	
	$scope.cleanVariables = function() {
		$scope.found = false;
		$scope.reseller = {};
	}
	
	$scope.cleanAlerts = function() {
		$scope.success=false;
		$scope.error=false;
	}

	$scope.goTo = function(option) {
		$scope.option = option;
		$scope.cleanVariables();
	}
	
	$scope.listResellers = function() {
		resellerService.validate($scope.userToken,$scope.tokenName).then(function successCallback(response) {
			$scope.validate = response.data;			
			console.log("validate");
			console.log($scope.validate);
			if($scope.validate.erro){
				$scope.error=true;
				$scope.alertMessage = "Token inválido. Faça login novamente!";
			}else{
				$scope.found = true;
				resellerService.getResellers().then(function(response) {
					$scope.listOfResellers = response.data;
					console.log($scope.listOfResellers);
				});
			}
		}, function errorCallback(response) {
			$scope.error=true;
			$scope.alertMessage = "Token inválido. Faça login novamente!";
		});
		
	}

	
	$scope.findResellerById = function(isFormValid) {
		if (isFormValid) {
			var id = $scope.reseller.id;
			resellerService.findResellerById(id).then(function successCallback(response) {
				$scope.reseller = response.data;
				$scope.listOfResellers = $scope.reseller;
				console.log("findResellerById");
				console.log($scope.reseller);
				$scope.found = true;
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Reseller not found in database.";
			});
			$timeout(function() {
				if(!$scope.found) {
					$scope.cleanAlerts();
				}
				$scope.cleanAlerts();
				$scope.error = false;
			},5000);
		}
	}

	$scope.findResellerByCPFName = function(isFormValid) {
		if (isFormValid) {
			var completeName = $scope.reseller.completeName;
			var cpf = $scope.reseller.cpf;
			resellerService.findResellerByCPFName(cpf, completeName).then(function successCallback(response) {
				$scope.listOfResellers = $scope.reseller;
				console.log("findResellerByCPFName");
				console.log($scope.reseller);
				$scope.found = true;
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Reseller not found in database.";
			});
			$timeout(function() {
				if(!$scope.found) {
					$scope.cleanAlerts();
				}
				$scope.cleanAlerts();
				$scope.error = false;
			},5000);
		}
	}
	
	$scope.insertReseller = function() {
		console.log("insertReseller");
		console.log($scope.reseller.cpf.length);
		if($scope.reseller.cpf.length <=13){
			$scope.error=true;
			$scope.alertMessage = "CPF is not correct.";
			return;
		}
			var reseller = {
				
				cpf: $scope.reseller.cpf,
				completeName: $scope.reseller.name,
				email: $scope.reseller.email,
				passwd: $scope.reseller.passwd
			}
			console.log("insertReseller");
			console.log(reseller);
			resellerService.insertReseller(reseller).then(function successCallback(response) {
				$scope.alertMessage = "Reseller inserted with success."
				$scope.success=true;
				$scope.error=false;
				$scope.cleanVariables();
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.success=false;
				$scope.alertMessage = "Reseller already exists in database.";
			});
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
		
	}
	
	$scope.callEditDeleteResellers = function(opcao,id) {
		$scope.option = opcao;
		console.log("opcao");
		console.log(opcao);
		console.log("id");
		console.log(id);
		resellerService.findResellerById(id).then(function successCallback(response) {
			$scope.listOfResellers = response.data;
			$scope.reseller = angular.copy($scope.listOfResellers[0]);
			console.log("findResellerById===>");
			console.log($scope.reseller);
			$scope.found = true;
		}, function errorCallback(response) {
			$scope.error=true;
			$scope.alertMessage = "Reseller not found in database.";
		});
		$timeout(function() {
			if(!$scope.found) {
				$scope.cleanAlerts();
			}
			$scope.cleanAlerts();
			$scope.error = false;
		},5000);
	}

	$scope.editReseller = function(isFormValid) {
		console.log("editResellers===>");
		console.log($scope.reseller);
		if($scope.reseller.cpf.length <=13){
			$scope.error=true;
			$scope.alertMessage = "CPF is not correct.";
			return;
		}
		if (isFormValid) {
			resellerService.updateReseller($scope.reseller).then(function successCallback(response) {
				$scope.alertMessage = "Reseller editted with success."
				$scope.success=true;
				$scope.error=false;
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Reseller coudn't be editted.";
			});
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
		}
	}
	
	$scope.deleteReseller = function() {
		console.log("deleteReseller===>>");
		console.log($scope.reseller.id);
		if ($scope.formDelete.$valid) {
			var id = $scope.reseller.id;
			resellerService.deleteReseller(id).then(function(response) {
				$scope.alertMessage = "Reseller deleted with success."
				$scope.success=true;
				$scope.cleanVariables();
				resellerService.getResellers().then(function(response) {
					$scope.listOfResellers = response.data;
					$scope.option = 3;
				});
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Reseller coudn't be deleted.";
			});
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
		}
	}

	$scope.goToPurchases = function() {
		window.open('http://localhost:3000/purchasescrud?token='+$scope.userToken, "_self");

		
		$timeout(function() {
			$scope.cleanAlerts();
		},5000);

}
	
}]).directive("cpfDir", CpfDir);


function CpfDir() {
  return {
    link : function(scope, element, attrs) {
        var options = {
            onKeyPress: function(val, e, field, options) {
                putMask();
            }
        }

        $(element).mask('999.999.99-99', options);

        function putMask() {
            var mask;
            var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara
            if(cleanVal.length > 10) {//verifica a quantidade de digitos.
                mask = "99.999.999/9999-99";
            } else {
                mask = "999.999.99-99";
            }
            $(element).mask(mask, options);//aplica a mascara novamente
        }
    }
  }
};;