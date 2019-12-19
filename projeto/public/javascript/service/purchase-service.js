angular.module('boticarioApplication').service('purchaseService',['$http',function($http){
	
	return {
		getPurchase: function(dpurchase,status) {
		 	dpurchase = $http.get("/purchases/all");
			console.log("dpurchase");
			console.log(dpurchase);
			return dpurchase;
		},
		findPurchaseByFind: function(cpf, code, date, valie, status) {
			return $http.get("/purchases/cpf/" + cpf + "/code/" + code+ "/date/" + date+ "/valie/" + valie+ "/status/" + status);
		},
		findPurchaseById: function(id) {
			return $http.get("/purchases/id/" + id );
		},
		insertPurchase: function(purchase) {
			return $http.post("/purchases", purchase);
		},
		updatePurchase: function(purchase) {
			return $http.put("/purchases/"+purchase.id, purchase);
		},
		deletePurchase: function(id) {
			return $http.delete("/purchases/" + id );
		},
		getAllStatus: function() {
			return $http.get("/status/all");
		},
		getStatusById: function(id) {
			return $http.get("/status/id/"+ id);
		},
		getCashBackAcumulated: function(cpf,token) {
			console.log("getCashBackAcumulated");
			cpfSemPonto = cpf.replace(".", "");
			cpfSemPontos = cpfSemPonto.replace(".", "");
			cpfSemHifen = cpfSemPontos.replace("-", "");
			console.log(cpfSemHifen);
			/*var config = {"headers": {
				"Authorization": token
				}
			};*/
			  
			return $http.get("https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf="+ cpfSemHifen," headers { token: '"+token+"' } ");
		}
	}
	
}]);