'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pessoa = mongoose.model('Pessoa'),
	_ = require('lodash');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.totalRegistros = function(req, res) {
	Pessoa.count(function(err, c) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// console.log('Count is ' + c);
			res.json(c);
		}
	});
};
