// Módulo
var facturasApp = angular.module('facturasApp', ['facturasServices']);

//Controlador
facturasApp.controller('mainController',
		['$scope', '$location', 'Factura', function($scope, $location, Factura){
	// Esto es para el sistema de facturas nuevas
	var now = Date();
	$scope.ResetNewBill = function(){
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
	};
	$scope.ResetNewBill();

	$scope.ListaFacturas = [];
	$scope.LoadFacturas = function(){
//		Factura.
	};
	

	sumador = function(v, acc){
		return v + acc;
	};

	$scope.CalculaSubtotal = function(){
		var p = $scope.NewBill.productos;
		if(p.length == 0){
			return 0;
		} else {
			return p.map(function(x){
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

	$scope.AddToCart = function(){
		$scope.NewBill.productos.push($scope.NewBill.current);
		$scope.NewBill.current = {
			"descripcion": "",
			"cantidad": 0,
			"precio": 0
		};
	}

	// Esto es necesario para poder cambiar de páginas
	$scope.isActive = function (viewLocation) {
		var active = (viewLocation === $location.path());
		if(viewLocation === "/" &&
				$location.path() === ""	){
					active = true;
				}
		return active;
	};

	Factura.get({"id": "52a4f6f98e50816c298b4567"}, function(x){
		console.log(x);
	});
	Factura.query({}, function(x){
		console.log(x);
	});
}]);
