'use strict';

// Pessoas controller
angular.module('pessoas').controller('PessoasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pessoas', '$http', '$window',
	function($scope, $stateParams, $location, Authentication, Pessoas, $http, $window) {
		$scope.authentication = Authentication;

		// Create new Pessoa
		$scope.create = function() {
			// Create new Pessoa object
			var pessoa = new Pessoas ({
				nome: this.nome,
				sobrenome: this.sobrenome,
				cpf: this.cpf,
				dataNascimento: this.dataNascimento,
				email: this.email,
				pai: this.pai,
				mae: this.mae,
				nacionalidade: this.nacionalidade,
				naturalidade: this.naturalidade,
				pisPasep: this.pisPasep,
				dataAdmissao: this.dataAdmissao,
				dataDemissao: this.dataDemissao,
				inss: this.inss,
				nomeConjuge: this.nomeConjuge
			});

			// Redirect after save
			pessoa.$save(function(response) {
				$location.path('pessoas/' + response._id);

				// Clear form fields
				$scope.nome = '';
				$scope.sobrenome = '';
				$scope.cpf = '';
				$scope.dataNascimento = '';
				$scope.email = '';
				$scope.pai = '';
				$scope.mae = '';
				$scope.nacionalidade = '';
				$scope.naturalidade = '';
				$scope.pisPasep = '';
				$scope.dataAdmissao = '';
				$scope.dataDemissao = '';
				$scope.inss = '';
				$scope.nomeConjuge = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.selected = null;
		$scope.setSelected = function (idSelectedVote) {
		   $scope.idSelectedVote = idSelectedVote;
		   console.log(idSelectedVote);
		   $scope.pessoa = Pessoas.get({
				pessoaId: idSelectedVote
			});
		   $scope.pessoa.$remove(function() {
				// $location.path('pessoas');
			});

		};
		$scope.ShowConfirm = function (pessoa) {
				if ($window.confirm('Confirma apagar o registro de')) {
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
				} else {
					console.log('Você Cancelou');
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

		// #scope.findById({_id: 'Alice'}).remove().exec();

		$scope.getPessoas = function () {
		$http.get('/totalRegistros').success(function (response) {
			$scope.totalItems = response;
			$http.get('/pessoasList/'+$scope.currentPage+'/'+$scope.itemsPerPage)
			    .success(function (response) {
					$scope.pessoas = response;
				})
				.error(function (response) {
				 	$scope.error = response.message;
			    });
			})
			.error(function (response) {
			   	$scope.error = response.message;
		    });
		};

	}
]);
