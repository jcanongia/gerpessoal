'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	var users = require('../../app/controllers/users.server.controller');
	app.route('/').get(core.index);
};
