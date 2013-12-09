// Módulo
var facturasApp = angular.module('facturasApp', ['facturasServices']);

//Controlador
facturasApp.controller('mainController',
		['$scope', '$location', 'Factura', function($scope, $location, Factura){
			sumador = function(v, acc){
				return v + acc;
			};
			sumaCampo = function(arreglo, campo){
				return arreglo.map(function(v){
					return v[campo];
				}).reduce(sumador, 0);
			}

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
				Factura.query({}, function(x){
					$scope.ListaFacturas = [];
					var lst = [];
					// Actualiza los valores de las facturas
					for(var i = 0; i < x.length; i++){
						/*
						 if(x[i].productos != undefined){
							x[i].TotalFactura = x[i].productos.map(
								function(e){
									return e.precio * e.cantidad;
								}).reduce(sumador, 0);
						} else {
							x[i].TotalFactura = 0;
						}*/

						if(x[i].pagos != undefined){
							x[i].TotalPagado = x[i].pagos.map(
								function(e){
									return e.pago;
								}).reduce(sumador, 0);
						} else {
							x[i].TotalPagado = 0;
						}

					}
					$scope.ListaFacturas = x;
					// Actualiza valores generales del sistema:
					$scope.general = {
						"TotalFacturas": x.length,
						"TotalPagado": sumaCampo(x, "TotalPagado"),
						"TotalFacturado": sumaCampo(x, "TotalFactura"),
						"TotalAdeudado": sumaCampo(x, "TotalFactura") - sumaCampo(x, "TotalPagado")
					}
				});
			};
			$scope.LoadFacturas();



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
				return $scope.CalculaSubtotal()
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
			};

			// Añade una factura al sistema...
			$scope.AddBill = function(){
				var f = $scope.NewBill;
				var factura = {
					"emisor": f.emisor,
					"cliente": f.cliente,
					"fecha": f.fecha,
					"productos": f.productos,
					"TotalFactura": $scope.CalculaTotal(),
					"TotalImpuestos": $scope.CalculaImpuestos(),
					"TotalDescuento": $scope.CalculaImpuestos(),
					"TotalSubtotal": $scope.CalculaSubtotal()
				};
				Factura.save({},factura);
				// Limpia la factura actual
				$scope.ResetNewBill();
				// Y recarga los datos:
				$scope.LoadFacturas();
			};

			// Añade una factura al sistema...
			$scope.AddBillAndPay = function(){
				var f = $scope.NewBill;
				var factura = {
					"emisor": f.emisor,
					"cliente": f.cliente,
					"fecha": f.fecha,
					"productos": f.productos,
					"TotalFactura": $scope.CalculaTotal(),
					"TotalImpuestos": $scope.CalculaImpuestos(),
					"TotalDescuento": $scope.CalculaImpuestos(),
					"TotalSubtotal": $scope.CalculaSubtotal(),
					"pagos": [
					{"fecha": f.fecha,
						"pago": $scope.CalculaTotal()}]
				};
				Factura.save({},factura);
				// Limpia la factura actual
				$scope.ResetNewBill();
				// Y recarga los datos:
				$scope.LoadFacturas();
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

		}]);
