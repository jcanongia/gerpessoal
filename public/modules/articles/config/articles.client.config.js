'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'Listar Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'Novo Article', 'articles/create');
	}
]);