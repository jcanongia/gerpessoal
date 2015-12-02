'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pessoa Schema
 */
var PessoaSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pessoa name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Pessoa', PessoaSchema);