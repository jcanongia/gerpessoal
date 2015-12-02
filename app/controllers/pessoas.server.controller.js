'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pessoa = mongoose.model('Pessoa'),
	_ = require('lodash');

/**
 * Create a Pessoa
 */
exports.create = function(req, res) {
	var pessoa = new Pessoa(req.body);
	pessoa.user = req.user;

	pessoa.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pessoa);
		}
	});
};

/**
 * Show the current Pessoa
 */
exports.read = function(req, res) {
	res.jsonp(req.pessoa);
};

/**
 * Update a Pessoa
 */
exports.update = function(req, res) {
	var pessoa = req.pessoa ;

	pessoa = _.extend(pessoa , req.body);

	pessoa.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pessoa);
		}
	});
};

/**
 * Delete an Pessoa
 */
exports.delete = function(req, res) {
	var pessoa = req.pessoa ;

	pessoa.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pessoa);
		}
	});
};

/**
 * List of Pessoas
 */
exports.list = function(req, res) { 
	Pessoa.find().sort('-created').populate('user', 'displayName').exec(function(err, pessoas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pessoas);
		}
	});
};

/**
 * Pessoa middleware
 */
exports.pessoaByID = function(req, res, next, id) { 
	Pessoa.findById(id).populate('user', 'displayName').exec(function(err, pessoa) {
		if (err) return next(err);
		if (! pessoa) return next(new Error('Failed to load Pessoa ' + id));
		req.pessoa = pessoa ;
		next();
	});
};

/**
 * Pessoa authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pessoa.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
