'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pessoas = require('../../app/controllers/pessoas.server.controller');

	// Pessoas Routes
	app.route('/pessoas')
		.get(users.requiresLogin, pessoas.list)
		//.get(users.requiresLogin, pessoas.hasAuthorization, pessoas.list)
		.post(users.requiresLogin, pessoas.create);

	app.route('/pessoas/create')
		.get(users.requiresLogin)
		.post(users.requiresLogin, pessoas.create);

	app.route('/pessoas/:pessoaId')
		.get(pessoas.read)
		.put(users.requiresLogin, pessoas.hasAuthorization, pessoas.update)
		.delete(users.requiresLogin, pessoas.hasAuthorization, pessoas.delete);

	app.route('/pessoasList/:page/:query')
	    .get(pessoas.pessoasList);

	app.route('/totalRegistros')
	    .get(pessoas.totalRegistros);

	// Finish by binding the Pessoa middleware
	app.param('pessoaId', pessoas.pessoaByID);
};
