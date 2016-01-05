'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		//     if ($scope.authentication.user === '') {
    //     $location.path('/articles');
    // }
		$scope.alerts =[
			{
				icon:'glyphicon-user',
				colour:'btn-success',
				total:'Gerente Pessoal' ,
				description:'TOTAL CUSTOMERS'
			},
			{
				icon:'glyphicon-calendar',
				colour:'btn-primary',
				total:'Fundação Trompowsky' ,
				description:'UPCOMING EVENTS'
			}
			// {
			// 	icon:'glyphicon-edit',
			// 	colour:'btn-success',
			// 	total:'527' ,
			// 	description:'NEW CUSTOMERS IN'
			// },
			// {
			// 	icon:'glyphicon-record',
			// 	colour:'btn-info',
			// 	total:'85,000' ,
			// 	description:'EMAILS SENT'
			// },
			// {
			// 	icon:'glyphicon-eye-open',
			// 	colour:'btn-warning',
			// 	total:'268' ,
			// 	description:'FOLLOW  UPS  REQUIRED'
			// },
			// {
			// 	icon:'glyphicon-flag',
			// 	colour:'btn-danger',
			// 	total:'348' ,
			// 	description:'REFERRALS  TO  MODERATE'
			// },
		];


	}
]);
