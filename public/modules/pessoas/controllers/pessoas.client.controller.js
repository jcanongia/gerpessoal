'use strict';

// Pessoas controller
angular.module('pessoas').controller('PessoasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pessoas',
	function($scope, $stateParams, $location, Authentication, Pessoas) {
		$scope.authentication = Authentication;

		// Create new Pessoa
		$scope.create = function() {
			// Create new Pessoa object
			var pessoa = new Pessoas ({
				name: this.name
			});

			// Redirect after save
			pessoa.$save(function(response) {
				$location.path('pessoas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pessoa
		$scope.remove = function(pessoa) {
			if ( pessoa ) { 
				pessoa.$remove();

				for (var i in $scope.pessoas) {
					if ($scope.pessoas [i] === pessoa) {
						$scope.pessoas.splice(i, 1);
					}
				}
			} else {
				$scope.pessoa.$remove(function() {
					$location.path('pessoas');
				});
			}
		};

		// Update existing Pessoa
		$scope.update = function() {
			var pessoa = $scope.pessoa;

			pessoa.$update(function() {
				$location.path('pessoas/' + pessoa._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pessoas
		$scope.find = function() {
			$scope.pessoas = Pessoas.query();
		};

		// Find existing Pessoa
		$scope.findOne = function() {
			$scope.pessoa = Pessoas.get({ 
				pessoaId: $stateParams.pessoaId
			});
		};
	}
]);