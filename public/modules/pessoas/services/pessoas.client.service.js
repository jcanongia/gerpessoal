'use strict';

//Pessoas service used to communicate Pessoas REST endpoints
angular.module('pessoas').factory('Pessoas', ['$resource',
	function($resource) {
		return $resource('pessoas/:pessoaId', { pessoaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);