'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication','$http',
	function($scope, $location, Authentication, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		//     if ($scope.authentication.user === '') {
    //     $location.path('/articles');
    // }

		$scope.getRegistros = function () {
		$http.get('/totalRegistros').success(function (response) {
			$scope.totalItems = response;
			console.log($scope.totalItems);
		})
				.error(function (response) {
					$scope.error = response.message;
					});
		};

		$scope.alerts =[
			{
				icon:'glyphicon-user',
				colour:'btn-success',
				total: $scope.totalItems,
				description:'TOTAL PESSOAS'
			}
		];
	}
]);
