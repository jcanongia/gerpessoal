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
	nome: {
		type: String,
		default: '',
		trim: true
	},
	sobrenome: {
		type: String,
		default: '',
		trim: true
	},	
	cpf: {
		type: String,
		default: '',
		trim: true
	},	
	identidade: {
		nr: {
			type:String, 
			default: '',
			trim: true
		},
		dataExpedicao: {
			type: Date,
			default: ''
		},
		orgaoExpedidor: {
			type: String, 
			default: '',
			trim: true
		} 
	},	
	dataNascimento: {
		type: Date, 
		default: ''
	},	
	email: {
		type: String,
		default: '',
		trim: true
	},	
	endereco:{
		logradouro: {
			type: String,
			default: '',
			trim: true
		},
		nr: {
			type: Number,
			default: '',
			trim: true	
		},
		complemento: {
			type: String,
			default: '',
			trim: true
		},
		cep: {
			type: String,
			default: '',
			trim: true
		},
		bairro: {
			type: String,
			default: '',
			trim: true
		},
		cidade: {
			type: String,
			default: '',
			trim: true
		},
		estado: {
			type: String,
			default: '',
			trim: true
		}
	},	
	pai: {
		type: String,
		default: '',
		trim: true
	},	
	mae: {
		type: String,
		default: '',
		trim: true
	},	
	banco: {
		nome: {
			type: String,
			default: '',
			trim: true
		},
		agencia: {
			type: String,
			default: '',
			trim: true
		},
		conta: {
			type: String,
			default: '',
			trim: true
		}
	},	
	nacionalidade: {
		type: String,
		default: '',
		trim: true
	},	
	naturalidade: {
		type: String,
		default: '',
		trim: true
	},
	pisPasep: {
		type: String,
		default: '',
		trim: true
	},
	dataAdmissao: {
		type: Date,
		default: ''
	},
	dataDemissao: {
		type: Date,
		default: ''
	},
	inss: {
		type: String,
		default: '',
		trim: true
	},
	ctps: {
		nr: {
			type: String,
			default: '',
			trim: true
		},
		serie: {
			type: String,
			default: '',
			trim: true
		}
	},
	telefone: {
		residencia: {
			type: String,
			default: '',
			trim: true
		},
		celular: {
			type: String,
			default: '',
			trim: true
		},
		trabalho: {
			type: String,
			default: '',
			trim: true
		}
	},
	nomeConjuge: {
		type: String,
		default: '',
		trim: true
	},
	estadoCivil: {
		estado : {
			type: String,
			default: '',
			trim: true
		},
		regime: {
			type: String,
			default: '',
			trim: true
		}
	},
	cartaoMilhas: {
		empresa: {
			type: String,
			default: '',
			trim: true
		},
		nome: {
			type: String,
			default: '',
			trim: true
		},
		nr: {
			type: Number,
			default: '',
			trim: true
		}
	},
	dependentes: [{
		nome: {
			type: String,
			default: '',
			trim: true
		},
		parentesco: {
			type: String,
			default: '',
			trim: true
		},
		cpf: {
			type: String,
			default: '',
			trim: true
		},
		dataNascimento: {
			type: Date,
			default: ''
		}
	}],
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