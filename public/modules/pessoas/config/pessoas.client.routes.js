'use strict';

//Setting up route
angular.module('pessoas').config(['$stateProvider',
	function($stateProvider) {
		// Pessoas state routing
		$stateProvider.
		state('listPessoas', {
			url: '/pessoas',
			templateUrl: 'modules/pessoas/views/list-pessoas.client.view.html'
		}).
		state('createPessoa', {
			url: '/pessoas/create',
			templateUrl: 'modules/pessoas/views/create-pessoa.client.view.html'
		}).
		state('viewPessoa', {
			url: '/pessoas/:pessoaId',
			templateUrl: 'modules/pessoas/views/view-pessoa.client.view.html'
		}).
		state('editPessoa', {
			url: '/pessoas/:pessoaId/edit',
			templateUrl: 'modules/pessoas/views/edit-pessoa.client.view.html'
		});
	}
]);