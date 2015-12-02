'use strict';

// Configuring the Articles module
angular.module('pessoas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pessoas', 'pessoas', 'dropdown', '/pessoas(/create)?');
		Menus.addSubMenuItem('topbar', 'pessoas', 'List Pessoas', 'pessoas');
		Menus.addSubMenuItem('topbar', 'pessoas', 'New Pessoa', 'pessoas/create');
	}
]);