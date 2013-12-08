// Módulo
var facturasApp = angular.module('facturasApp', []);

//Controlador
facturasApp.controller('mainController', function($scope, $location){
	// Esto es para el sistema de facturas nuevas
	var now = Date();
	$scope.NewBill = {
		"emisor": "",
		"cliente": "",
		"fecha": now,
		"current": {
			"descripcion": "",
			"cantidad": 0,
			"precio": 0
		},
		"productos": []
	};

	sumador = function(v, acc){
		return v + acc;
	};

	$scope.CalculaSubtotal = function(){
		if($scope.NewBill.productos.length == 0){
			return 0;
		} else {
			return $scope.NewBill.productos.map(function(x){
				return x.cantidad * x.precio;
			}).reduce(sumador, 0);
		}
	};

	$scope.CalculaImpuestos = function(){
		return $scope.CalculaSubtotal() * 0.13;
	};

	$scope.CalculaDescuento = function(){
		return $scope.CalculaSubtotal() * 0.10;
	};

	$scope.CalculaTotal = function(){
		return $scope.CalculaSubtotal
		       	+ $scope.CalculaImpuestos()
		       	- $scope.CalculaDescuento();
	};

	// Esto es necesario para poder cambiar de páginas
	$scope.isActive = function (viewLocation) {
		var active = (viewLocation === $location.path());
		if(viewLocation === "/" &&
			$location.path() === ""	){
				active = true;
			}
		return active;
	};
});
