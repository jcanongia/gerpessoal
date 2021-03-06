'use strict';

// var BrM = require('br-masks');

var m = angular.module('idf.br-filters', []);

// module.exports = m.name;

m.filter('percentage', ['$filter', function($filter) {
	return function(input, decimals) {
		if (angular.isUndefined(input) || input === null) {
			return input;
		}

		return $filter('number')(input * 100, decimals) + '%';
	};
}])
.filter('brCep', [function(BrM) {
	return function(input) {
		return BrM.cep(input);
	};
}])
.filter('brPhoneNumber', [function(BrM) {
	return function(input) {
		return BrM.phone(input);
	};
}])
.filter('brCpf', [function(BrM) {
	return function(input) {
		return BrM.cpf(input);
	};
}])
.filter('brCnpj', [function(BrM) {
	return function(input) {
		return BrM.cnpj(input);
	};
}])
.filter('brCpfCnpj', [function(BrM) {
	return function(input) {
		return BrM.cpfCnpj(input);
	};
}])
.filter('brIe', [function(BrM) {
	return function(input, uf) {
		return BrM.ie(input,uf);
	};
}])
.filter('finance', ['$locale', function($locale, BrM) {
	return function(input, currency, decimals) {
		if (angular.isUndefined(input) || input === null) {
			return input;
		}

		var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
			thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
			currencySym = '';

		if(currency === true) {
			currencySym = $locale.NUMBER_FORMATS.CURRENCY_SYM + ' ';
		} else if (currency) {
			currencySym = currency;
		}

		return currencySym + BrM.finance(input, decimals, decimalDelimiter, thousandsDelimiter);
	};
}])
.filter('nfeAccessKey', [function(BrM) {
	return function(input) {
		return BrM.nfeAccessKey(input);
	};
}]);
