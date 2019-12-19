angular.module('boticarioApplication').service('loginService', ['$http', function ($http) {

	return {
		login: function (user) {
			console.log("login");
			console.log(user);
			return $http.post("/resellers/login", user);
		},
		register: function (user) {
			console.log("register");
			console.log(user);
			return $http.post("/resellers/register", user);
		},
		validate: function (token) {
			console.log("validate");
			console.log(token);
			return $http.post("/resellers/validate", token);
		},
		redireciona: function (user) {
			console.log("validate");
			console.log(user);
			$location.path("/menu");
		},
	}

}]);