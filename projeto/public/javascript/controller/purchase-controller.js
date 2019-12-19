var app = angular.module("boticarioApplication", []); 
app.controller("purchaseController", ["$scope", "$http", "$timeout", "$window", "purchaseService",  function($scope, $http, $timeout, $window, purchaseService) {
	$scope.error = false;
	$scope.success = false;
	$scope.found = false;
	$scope.dados ={statuses:{}};
	$scope.option = -1;

	purchaseService.getAllStatus().then(function(data){
		$scope.dados.statuses = data.data;
		console.log($scope.dados.statuses);
	});

	//CAPTURA TOKEN JWT PARA ENVIAR NA REQUISIÇÃO REST
    var token = $window.localStorage.getItem('tokens');
	console.log('token local storage='+token);
	$scope.userToken = token;
	var tokenName = $window.localStorage.getItem('tokenName');
	console.log('tokenName='+tokenName);
	$scope.tokenName = tokenName;
	
	$scope.cleanVariables = function() {
		$scope.found = false;
		$scope.purchase = {};
	}
	
	$scope.cleanAlerts = function() {
		$scope.success=false;
		$scope.error=false;
	}

	$scope.goTo = function(option) {
		$scope.option = option;
		$scope.cleanVariables();
	}
	
	$scope.listPurchases = function() {
		purchaseService.getPurchase().then(function(response) {
			$scope.listOftPurchase = response.data;
			console.log("listOftPurchase===>>");
			console.log($scope.listOftPurchase);
		});
	}

	function percentage(percent, total) {
		return ((total * percent / 100)).toFixed(2)
	}

	$scope.getCashBackAcumulated = function() {
		console.log("getCashBackAcumulated===>>");
		
		var cpf = $scope.purchase.cpf;
		var ramdom = Math.floor(Math.random() * 10000);
		console.log("ramdom");
		console.log(ramdom);
		/**** OPÇAO DE TESTES CASO O SERVIÇO FALHE
		$scope.purchase.acumulated = ramdom;
		if($scope.purchase.valie <= 1000){
			$scope.purchase.percentAplied=10;
		}else if($scope.purchase.valie <= 1500){
			$scope.purchase.percentAplied=15;
		}else{
			$scope.purchase.percentAplied=20;
		}
		$scope.purchase.dicountCashback=percentage($scope.purchase.percentAplied,$scope.purchase.acumulated);
		*/

		/**** PARA TESTES DE CHAMADA AWS É NECESSÁRIO CONFIGURAR O CHROME ATRAVES DOS COMANDO ABAIXO***/
		/****  cd C:\Program Files (x86)\Google\Chrome\Application>             ***/
		/**** chrome.exe --disable-web-security --user-data-dir="c:/chromedev"  ***/
		purchaseService.getCashBackAcumulated(cpf,$scope.userToken).then(function successCallback(response) {
			var retorno = response.data;
			console.log(retorno);
			console.log("getCashBackAcumulated===>>");
			$scope.purchase.acumulated=retorno.body.credit;
			if($scope.purchase.valie <= 1000){
			$scope.purchase.percentAplied=10;
			}else if($scope.purchase.valie <= 1500){
				$scope.purchase.percentAplied=15;
			}else{
				$scope.purchase.percentAplied=20;
			}
			$scope.purchase.dicountCashback=percentage($scope.purchase.percentAplied,$scope.purchase.acumulated);
			console.log($scope.purchase.acumulated );

		}, function errorCallback(response) {
			$scope.error=true;
			$scope.alertMessage = "Purchase not found in database.";
		});
		$timeout(function() {
			if(!$scope.found) {
				$scope.cleanAlerts();
			}
			$scope.cleanAlerts();
			$scope.error = false;
		},5000);
		
	}
	
	$scope.findPurchaseById = function(isFormValid) {
		console.log("findPurchaseById===>>");
		if (isFormValid) {
			var id = $scope.purchase.id;
			console.log(id);
			purchaseService.findPurchaseById(id).then(function successCallback(response) {
				$scope.purchase = response.data;
				$scope.listOfPurchases = angular.copy($scope.purchase[0]);
				console.log("findPurchaseById");
				console.log($scope.purchase);
				$scope.found = true;
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Purchase not found in database.";
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

	$scope.findPurchaseByFind = function() {
		var cpf = $scope.purchase.cpf;
		var code = $scope.purchase.code;
		var date = $scope.purchase.date;
		var valie = $scope.purchase.valie;
		var status = $scope.purchase.status;
		if(angular.isDefined($scope.purchase.status) && $scope.purchase.status != null){
			if(angular.isDefined($scope.purchase.status.id) && $scope.purchase.status.id != null){
				status = $scope.purchase.status.id;
			}
		}else{
			status = undefined;
		}
		
		purchaseService.findPurchaseByFind(cpf, code, date, valie, status).then(function successCallback(response) {
			$scope.listOfPurchase = response.data;
			console.log("findPurchaseByFind");
			console.log($scope.listOfPurchases);
		}, function errorCallback(response) {
			$scope.error=true;
			$scope.alertMessage = "Purchase not found in database.";
		});
		$timeout(function() {
			if(!$scope.found) {
				$scope.cleanAlerts();
			}
			$scope.cleanAlerts();
			$scope.error = false;
		},5000);
		
	}
	
	$scope.insertPurchase = function() {
		if($scope.purchase.cpf.length <=13){
			$scope.error=true;
			$scope.alertMessage = "CPF is not correct.";
			return;
		}
		if ($scope.formInsertPurchase.$valid) {
			var purchase = {
				
				cpf: $scope.purchase.cpf,
				code: $scope.purchase.code,
				date: $scope.purchase.date,
				valie: $scope.purchase.valie,
				acumulated: $scope.purchase.acumulated,
				dicountCashback: $scope.purchase.dicountCashback,
				percentAplied: $scope.purchase.percentAplied


				//status: $scope.purchase.status.id
			}
			console.log("insertPurchase>>>>");
			console.log(purchase);
			purchaseService.insertPurchase(purchase).then(function successCallback(response) {
				$scope.alertMessage = "Purchase inserted with success."
				$scope.success=true;
				$scope.error=false;
				$scope.cleanVariables();
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.success=false;
				$scope.alertMessage = "Purchase already exists in database.";
			});
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
		}
	}
	
	$scope.callEditDeletePurchases = function(opcao,id) {
		$scope.option = opcao;
		console.log("opcao");
		console.log(opcao);
		console.log("id");
		console.log(id);
		purchaseService.findPurchaseById(id).then(function successCallback(response) {
			$scope.listOfPurchases = response.data;
			$scope.purchase = angular.copy($scope.listOfPurchases[0]);
			console.log("findPurchaseById===>");
			console.log($scope.purchase);
			$scope.found = true;
			purchaseService.getStatusById($scope.purchase.statusId).then(function successCallback(response) {
				console.log("getStatusById===>");
				$scope.purchase.status = angular.copy(response.data[0]);
				console.log($scope.purchase);


			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Status not found in database.";
			});

		}, function errorCallback(response) {
			$scope.error=true;
			$scope.alertMessage = "Purchase not found in database.";
		});
		$timeout(function() {
			if(!$scope.found) {
				$scope.cleanAlerts();
			}
			$scope.cleanAlerts();
			$scope.error = false;
		},5000);
	}

	$scope.editPurchase = function(isFormValid) {
		console.log("editPurchases===>");
		console.log($scope.purchase);
		if($scope.purchase.cpf.length <=13){
			$scope.error=true;
			$scope.alertMessage = "CPF is not correct.";
			return;
		}
		if (isFormValid) {
			purchaseService.updatePurchase($scope.purchase).then(function successCallback(response) {
				$scope.alertMessage = "Purchase editted with success."
				$scope.success=true;
				$scope.error=false;
				$scope.option = 3;
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Purchase coudn't be editted.";
			});
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
		}
	}
	
	$scope.deletePurchase = function() {
		console.log("deletePurchase===>>");
		console.log($scope.purchase.id);
		
			var id = $scope.purchase.id;
			purchaseService.deletePurchase(id).then(function(response) {
				$scope.alertMessage = "Purchase deleted with success."
				$scope.success=true;
				$scope.cleanVariables();
				purchaseService.getPurchase().then(function(response) {
					$scope.listOftPurchase = response.data;
					$scope.option = 3;
				});
			}, function errorCallback(response) {
				$scope.error=true;
				$scope.alertMessage = "Purchase coudn't be deleted.";
			});
			$timeout(function() {
				$scope.cleanAlerts();
			},5000);
		
	}

	$scope.goToResellers = function() {
		window.open('http://localhost:3000/resellerscrud?token='+$scope.userToken, "_self");

		
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