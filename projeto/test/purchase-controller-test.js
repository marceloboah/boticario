describe('purchaseController', function() {
    beforeEach(module('boticarioApplication'));

    var $controller;

    beforeEach(inject(function(_$controller_){
              $controller = _$controller_;
    }));

    describe('$scope.error', function() {
        it('Check the scope.error', function() {
            var $scope = {};
            var controller = $controller('purchaseController', { $scope: $scope });
            expect($scope.error).toEqual(false);
        });
    });
    
    describe('$scope.success', function() {
        it('Check the scope.success', function() {
            var $scope = {};
            var controller = $controller('purchaseController', { $scope: $scope });
            expect($scope.success).toEqual(false);
        });
    });
    
    describe('$scope.found', function() {
        it('Check the scope.found', function() {
            var $scope = {};
            var controller = $controller('purchaseController', { $scope: $scope });
            expect($scope.found).toEqual(false);
        });
    });
    
    describe('$scope.option', function() {
        it('Check the scope.option', function() {
            var $scope = {};
            var controller = $controller('purchaseController', { $scope: $scope });
            expect($scope.option).toEqual(-1);
        });
    });
    
    describe('$scope.purchase', function() {
        it('Check the scope.purchase', function() {
            var $scope = {};
            var controller = $controller('purchaseController', { $scope: $scope });
            expect($scope.purchase).toEqual({});
        });
    });
    
    describe('$scope.listOfPurchase', function() {
        it('Check the scope.listOfPurchase', function() {
            var $scope = {};
            var controller = $controller('purchaseController', { $scope: $scope });
            expect($scope.listOfPurchase).toEqual([]);
        });
    });
    
    
});