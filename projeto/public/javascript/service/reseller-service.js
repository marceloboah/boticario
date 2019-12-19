angular.module('boticarioApplication').service('resellerService',['$http',function($http){
	
	return {
		getResellers: function() {
			return $http.get("/resellers/all");
		},
		findResellerByCPFName: function(cpf, name) {
			return $http.get("/resellers/cpf/" + cpf + "/name/" + name);
		},
		findResellerById: function(id) {
			return $http.get("/resellers/id/" + id );
		},
		insertReseller: function(reseller) {
			return $http.post("/resellers", reseller);
		},
		updateReseller: function(reseller) {
			return $http.put("/resellers/"+reseller.id, reseller);
		},
		deleteReseller: function(id) {
			return $http.delete("/resellers/" + id );
		},
		register: function (user) {
			console.log("register");
			console.log(user);
			return $http.post("/resellers/register", user);
		},
		validate: function (token,usr) {
			console.log("validate");
			console.log(token);
			return $http.post('/resellers/validate',null,{headers: {'Content-Type': 'application/json',
			"authorization" : token,
			"usr" : usr		
		 }});
		}
	}
	
}]);