var facturasServices = angular.module('facturasServices', ['ngResource']);

facturasServices.factory('Factura', ['$resource',
		function($resource){
			return $resource('http://dotsboxes.tk/api/bill/:id', {}, {
				pay: {method: 'PUT', params: {}, isArray:false}
			});
		}
		]
		);
