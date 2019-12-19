angular.module("boticarioApplication", [])
.service("memoriaService",function($scope){
   
    $scope.pessoas = [];
    $scope.adicionar = function (meuToken) {
        $scope.pessoas.push(angular.copy(meuToken));
    };

    $scope.retornar = function () {
        return $scope.pessoas;
    };


}); 