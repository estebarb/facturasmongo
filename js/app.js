// Módulo
var facturasApp = angular.module('facturasApp', []);

//Controlador
facturasApp.controller('mainController', function($scope, $location){
		$scope.msg = "este es un mensaje desde el scope";

		$scope.isActive = function (viewLocation) {
				var active = (viewLocation === $location.path());
				if(viewLocation === "/" &&
						$location.path() === ""	){
								active = true;
						}
				return active;
		};
});
