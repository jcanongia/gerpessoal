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
	pessoa.identidade = req.identidade;

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
	Pessoa.find().sort('-created').populate('user', 'nome').exec(function(err, pessoas) {
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
	Pessoa.findById(id).populate('user', 'nome').exec(function(err, pessoa) {
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

/**
* Paginate Total de Itens
**/
exports.totalRegistros = function(req, res) {
	Pessoa.count(function(err, c) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// console.log('Count is ' + c);
			res.json(c);
		}
	});
};

/**
* Paginate List articles
**/

exports.pessoasList = function(req, res){
    var page;
    if(!req.params.page)
    {
        page = 1;
    }else{
        page = req.params.page;
    }
// console.log(req.params.page);

  var per_page = req.params.query;
// console.log(req.params.query);

    Pessoa.find().sort('-created').skip((page-1)*per_page).limit(per_page).populate('user', 'nome').exec(function(err, pessoas) {
        if (err) {return res.status(400).send({
                message: errorHandler.getErrorMessage(err)});
        } else {res.json(pessoas);}
    });
};
