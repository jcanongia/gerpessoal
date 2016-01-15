'use strict';

// Pessoas controller
angular.module('pessoas').controller('PessoasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pessoas',
'$http', '$window', '$rootScope',
	function($scope, $stateParams, $location, Authentication, Pessoas, $http, $window, $rootScope) {
		$scope.authentication = Authentication;

		$scope.arrayDependentes = [];
		var obj = new Pessoas();
		$rootScope.show = false;
		$rootScope.rendered = false;
		$scope.arrayCPF = [];
		var resultadoPrimeiroNumero = 0;
		var resultadoSegundoNumero = 0;
		var j = 10;
		var resultado = 0;
		var pDigito = 0;
		var sDigito = 0;
		var primeiroDigito = 0;
		var segundoDigito = 0;
		var booleano = false;
		$rootScope.valido = true;
		$rootScope.validoDependente = true;
		var dia;
		var mes;
		var ano;
		$rootScope.dataValida = true;
		$rootScope.dataNascimentoValida = true;
		$rootScope.dataAdmissaoValida = true;
		$rootScope.dataDemissaoValida = true;
		$rootScope.dataNascimentoDependenteValida = true;
		var emailCheck;
		$rootScope.emailValidate = true;
		$rootScope.firstNameValidate = true;
		$rootScope.secondNameValidate = true;
		$rootScope.cpfValidate = true;

		$scope.nameValidate = function(valor){
				if(valor !== undefined){
						$rootScope.firstNameValidate = true;
				} else {
						$rootScope.firstNameValidate = false;
				}
		};

		$scope.secNameValidate = function(valor){
				if(valor !== undefined || valor !== ''){
						$rootScope.secondNameValidate = true;
				} else {
						$rootScope.secondNameValidate = false;
				}
		};

		/*
		** mecanismo para validar o email
		*/
		$scope.validateEmail = function(valor){
				emailCheck = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				if(emailCheck.test(valor)){
						$rootScope.emailValidate = true;
				} else {
						$rootScope.emailValidate = false;
				}
		};
		/*
		** valida as datas inseridas e verifica os dias meses anos e se e ano bisexto
		*/
		$scope.validateData = function(valor){if (valor !== undefined) {
			dia = valor.substring(0,2);
			mes = valor.substring(2,4);
			ano = valor.substring(4,9);

			if (ano > 1900 && ano < 2100) {
				if (dia > 0 && dia < 31 && mes > 0 && mes < 12) {
					if ((mes === '04' || mes === '06' || mes === '09' || mes === '11') && dia > 30) {
									$scope.dataValida = false;
						 } else if (mes === '02') {
									if (ano%4 === 0 && dia > 29) {
											$scope.dataValida = false;
									} else if (ano%4 !== 0 && dia > 28) {
											$scope.dataValida = false;
										 } else {
										$scope.dataValida = true;
											 }
						} else {
								$scope.dataValida = true;
							}
						 } else {
						$scope.dataValida = false;
								}
				} else {
				$scope.dataValida = false;
		}
		}};

		/*
		** valida as datas inseridas e verifica os dias meses anos e se e ano bisexto
		*/
		$scope.validateDataNascimento = function(valor){
			if (valor !== undefined) {
				dia = valor.substring(0,2);
				mes = valor.substring(2,4);
				ano = valor.substring(4,9);

				if (ano > 1900 && ano < 2100) {
					if (dia > 0 && dia < 31 && mes > 0 && mes < 12) {
						if ((mes === '04' || mes === '06' || mes === '09' || mes === '11') && dia > 30) {
										$scope.dataNascimentoValida = false;
							 } else if (mes === '02') {
										if (ano%4 === 0 && dia > 29) {
												$scope.dataNascimentoValida = false;
										} else if (ano%4 !== 0 && dia > 28) {
												$scope.dataNascimentoValida = false;
											 } else {
											$scope.dataNascimentoValida = true;
												 }
							} else {
									$scope.dataNascimentoValida = true;
								}
							 } else {
							$scope.dataNascimentoValida = false;
									}
					} else {
					$scope.dataNascimentoValida = false;
			}
			}};

		/*
		** valida as datas inseridas e verifica os dias meses anos e se e ano bisexto
		*/
		$scope.validateDataAdmissao = function(valor){if (valor !== undefined) {
			dia = valor.substring(0,2);
			mes = valor.substring(2,4);
			ano = valor.substring(4,9);

			if (ano > 1900 && ano < 2100) {
				if (dia > 0 && dia < 31 && mes > 0 && mes < 12) {
					if ((mes === '04' || mes === '06' || mes === '09' || mes === '11') && dia > 30) {
								 	$scope.dataAdmissaoValida = false;
					   } else if (mes === '02') {
						    	if (ano%4 === 0 && dia > 29) {
											$scope.dataAdmissaoValida = false;
							    } else if (ano%4 !== 0 && dia > 28) {
											$scope.dataAdmissaoValida = false;
					           } else {
										$scope.dataAdmissaoValida = true;
									     }
				   	} else {
								$scope.dataAdmissaoValida = true;
							}
						 } else {
						$scope.dataAdmissaoValida = false;
			    			}
				} else {
				$scope.dataAdmissaoValida = false;
		}
	}};

		/*
		** valida as datas inseridas e verifica os dias meses anos e se e ano bisexto
		*/
		$scope.validateDataDemissao = function(valor){	if (valor !== undefined) {
			dia = valor.substring(0,2);
			mes = valor.substring(2,4);
			ano = valor.substring(4,9);

			if (ano > 1900 && ano < 2100) {
				if (dia > 0 && dia < 31 && mes > 0 && mes < 12) {
					if ((mes === '04' || mes === '06' || mes === '09' || mes === '11') && dia > 30) {
								 	$scope.dataDemissaoValida = false;
					   } else if (mes === '02') {
						    	if (ano%4 === 0 && dia > 29) {
											$scope.dataDemissaoValida = false;
							    } else if (ano%4 !== 0 && dia > 28) {
											$scope.dataDemissaoValida = false;
					           } else {
										$scope.dataDemissaoValida = true;
									     }
				   	} else {
								$scope.dataDemissaoValida = true;
							}
						 } else {
						$scope.dataDemissaoValida = false;
			    			}
				} else {
				$scope.dataDemissaoValida = false;
		}
	}};

		/*
		** valida as datas inseridas e verifica os dias meses anos e se e ano bisexto
		*/
		$scope.validateDataNascimentoDependente = function(valor){
			if (valor !== undefined) {
			dia = valor.substring(0,2);
			mes = valor.substring(2,4);
			ano = valor.substring(4,9);

			if (ano > 1900 && ano < 2100) {
				if (dia > 0 && dia < 31 && mes > 0 && mes < 12) {
					if ((mes === '04' || mes === '06' || mes === '09' || mes === '11') && dia > 30) {
								 	$scope.dataNascimentoDependenteValida = false;
					   } else if (mes === '02') {
						    	if (ano%4 === 0 && dia > 29) {
											$scope.dataNascimentoDependenteValida = false;
							    } else if (ano%4 !== 0 && dia > 28) {
											$scope.dataNascimentoDependenteValida = false;
					           } else {
										$scope.dataNascimentoDependenteValida = true;
									     }
				   	} else {
								$scope.dataNascimentoDependenteValida = true;
							}
						 } else {
						$scope.dataNascimentoDependenteValida = false;
			    			}
				} else {
				$scope.dataNascimentoDependenteValida = false;
		}
	}};

		/*
		** validacao do cpf passo a passo conferindo os noves primeiros numeros e depois verificando se os digitos
		** sao iguais aos que foram preenchidos
		*/
		$scope.validateCPF = function(valor){
			pDigito = 0;
			sDigito = 0;
			resultadoPrimeiroNumero = 0;
			resultadoSegundoNumero = 0;
			j = 10;
			var numero = valor.toString();
			if (valor === '00000000000' ||
        valor === '11111111111' || valor === '22222222222' ||
        valor === '33333333333' || valor === '44444444444' ||
        valor === '55555555555' || valor === '66666666666' ||
        valor === '77777777777' || valor === '88888888888' ||
        valor === '99999999999'){
            $rootScope.valido = false;
						booleano = false;
			} else {
				for(var i = 0; i < 9; i++){
						resultadoPrimeiroNumero += (numero.charAt(i) * j);
						j--;
				}
				if((resultadoPrimeiroNumero * 10) % 11 === 10 || (resultadoPrimeiroNumero * 10) % 11 === 11) {
						pDigito = 0;
				} else {
						pDigito = ((resultadoPrimeiroNumero * 10) % 11);
				}
				primeiroDigito = parseInt(valor.charAt(9));
				if(pDigito === primeiroDigito){
					j = 11;
					for(var k = 0; k < 10; k++){
							resultadoSegundoNumero += (numero.charAt(k) * j);
							j--;
					}
					if((resultadoSegundoNumero * 10) % 11 === 10 || (resultadoSegundoNumero * 10) % 11 === 11) {
							sDigito = 0;
					} else {
							sDigito = ((resultadoSegundoNumero * 10) % 11);
					}
					segundoDigito = parseInt(numero.charAt(10));
					if(sDigito === segundoDigito){
						booleano = true;
					} else {
						booleano = false;
					}
				}
			}
			$rootScope.valido = booleano;
		};

		/*
		** validacao do cpf passo a passo conferindo os noves primeiros numeros e depois verificando se os digitos
		** sao iguais aos que foram preenchidos
		*/
		$scope.validateCPFDependente = function(valor){
			pDigito = 0;
			sDigito = 0;
			resultadoPrimeiroNumero = 0;
			resultadoSegundoNumero = 0;
			j = 10;
			if(valor !== undefined){
			var numero = valor.toString();
			if (valor === '00000000000' ||
        valor === '11111111111' || valor === '22222222222' ||
        valor === '33333333333' || valor === '44444444444' ||
        valor === '55555555555' || valor === '66666666666' ||
        valor === '77777777777' || valor === '88888888888' ||
        valor === '99999999999'){
            $rootScope.valido = false;
						booleano = false;
			} else {
				for(var i = 0; i < 9; i++){
						resultadoPrimeiroNumero += (numero.charAt(i) * j);
						j--;
				}
				if((resultadoPrimeiroNumero * 10) % 11 === 10 || (resultadoPrimeiroNumero * 10) % 11 === 11) {
						pDigito = 0;
				} else {
						pDigito = ((resultadoPrimeiroNumero * 10) % 11);
				}
				primeiroDigito = parseInt(valor.charAt(9));
				if(pDigito === primeiroDigito){
					j = 11;
					for(var k = 0; k < 10; k++){
							resultadoSegundoNumero += (numero.charAt(k) * j);
							j--;
					}
					if((resultadoSegundoNumero * 10) % 11 === 10 || (resultadoSegundoNumero * 10) % 11 === 11) {
							sDigito = 0;
					} else {
							sDigito = ((resultadoSegundoNumero * 10) % 11);
					}
					segundoDigito = parseInt(numero.charAt(10));
					if(sDigito === segundoDigito){
						booleano = true;
					} else {
						booleano = false;
					}
				}
			}
			$rootScope.valido = booleano;
		}
		};

		/*
		** controla a visibilidade dos campos de dependentes
		*/
		$scope.visibity = function() {
			if($rootScope.show === false){
					$rootScope.show = true;
			} else {
					$rootScope.show = false;
					$scope.arrayDependentes = [];
			}
			console.log($rootScope.show);
		};

		/*
		** controla a visibilidade dos campos de dependentes
		*/
		$scope.renderedEdit = function() {
			if($rootScope.rendered === false){
					$rootScope.rendered = true;
			} else {
					$rootScope.rendered = false;
			}
		};

		//metodo para inserir valores no array de dependentes usando o push
		$scope.addArray = function(dependentes){

			var cpf = '';
			if(dependentes.cpfDependente === undefined){
					cpf = dependentes.cpfDependente;
			}

			var data = dependentes.dataNascimentoDependente.substring(0, 2) + '-' +
				dependentes.dataNascimentoDependente.substring(2, 4) + '-' +
				dependentes.dataNascimentoDependente.substring(4, 8);

				$scope.arrayDependentes.push({
		        nomeDependente: dependentes.nomeDependente,
		        parentesco: dependentes.parentesco,
						cpfDependente: cpf,
						dataNascimentoDependente: data
		    });

				//limpar os campos
				dependentes.nomeDependente = '';
				dependentes.parentesco = '';
				dependentes.cpfDependente = '';
				dependentes.dataNascimentoDependente = '';
				cpf = '';
				data = '';
		};
		//metodo para inserir valores no array de dependentes usando o push na edição
		$scope.addArrayEdt = function(dependentes){

			var cpf = '';
			if(dependentes.cpfDependente === undefined){
					cpf = dependentes.cpfDependente;
			}

			var data = dependentes.dataNascimentoDependente.substring(0, 2) + '-' +
				dependentes.dataNascimentoDependente.substring(2, 4) + '-' +
				dependentes.dataNascimentoDependente.substring(4, 8);

				$scope.pessoa.dependentes.push({
		        nomeDependente: dependentes.nomeDependente,
		        parentesco: dependentes.parentesco,
						cpfDependente: cpf,
						dataNascimentoDependente: data
		    });

				//limpar os campos
				dependentes.nomeDependente = '';
				dependentes.parentesco = '';
				dependentes.cpfDependente = '';
				dependentes.dataNascimentoDependente = '';
				cpf = '';
				data = '';
		};

		/*
		** pego o dependente selecionado
		*/
		$scope.selecionado = function (dependentes) {//problema para selecionar o dependente no editar
				$scope.dependentes = dependentes;
				$rootScope.rendered = true;
		};

		/*
		** pego o dependente selecionado
		*/
		$scope.clear = function (dependentes) {
				$rootScope.rendered = false;
				$scope.arrayDependentes.push({
						nomeDependente: dependentes.nomeDependente,
						parentesco: dependentes.parentesco,
						cpfDependente: dependentes.cpfDependente,
						dataNascimentoDependente: dependentes.dataNascimentoDependente
				});

				//limpar os campos
				dependentes.nomeDependente = '';
				dependentes.parentesco = '';
				dependentes.cpfDependente = '';
				dependentes.dataNascimentoDependente = '';

				var index = $scope.arrayDependentes.indexOf(dependentes);
			  $scope.arrayDependentes.splice(index, 1);
		};

		/*
		** deletando o item da tabela de dependentes no criar
		*/
		$scope.deletarItemArray = function(dependentes) {
		  var index = $scope.arrayDependentes.indexOf(dependentes);
		  $scope.arrayDependentes.splice(index, 1);
		};

		/*
		** deletando o item da tabela de dependentes na tela de editar
		*/
		$scope.deletarItemArrayEdt = function(dependentes) {
		  var index = $scope.pessoa.dependentes.indexOf(dependentes);
		  $scope.pessoa.dependentes.splice(index, 1);
		};

		/*
		** pegamos os valores preenchidos nos campos de dependentes e setamos atraves do push
		** limpamos os campos do dependente e apos isso pegar o array em branco e excluimos
		*/
		$scope.edtArray = function(dependentes){
			$scope.arrayDependentes.push({
					nomeDependente: dependentes.nomeDependente,
					parentesco: dependentes.parentesco,
					cpfDependente: dependentes.cpfDependente,
					dataNascimentoDependente: dependentes.dataNascimentoDependente
			});

			//limpar os campos
			dependentes.nomeDependente = '';
			dependentes.parentesco = '';
			dependentes.cpfDependente = '';
			dependentes.dataNascimentoDependente = '';

			var index = $scope.arrayDependentes.indexOf(dependentes);
		  $scope.arrayDependentes.splice(index, 1);

			$rootScope.rendered = false;
		};


		// Create new Pessoa
		$scope.create = function() {
			// Create new Pessoa object
			var pessoa = new Pessoas ({
				nome: this.nome,
				sobrenome: this.sobrenome,
				cpf: this.cpf,
				dataNascimento: this.dataNascimento,
				email: this.email,
				pai: this.pai,
				mae: this.mae,
				nacionalidade: this.nacionalidade,
				naturalidade: this.naturalidade,
				pisPasep: this.pisPasep,
				dataAdmissao: this.dataAdmissao,
				dataDemissao: this.dataDemissao,
				inss: this.inss,
				nomeConjuge: this.nomeConjuge,
				rg: this.rg,
				endereco: this.endereco,
				banco: this.banco,
				ctps: this.ctps,
				telefone:this.telefone,
				estadoCivil: this.estadoCivil,
				cartaoMilhas: this.cartaoMilhas,
				percentual: this.percentual,
				grupoSocial: this.grupoSocial,
				dependentes: $scope.arrayDependentes
			});

			if(this.nome === undefined){
				$rootScope.firstNameValidate = false;
					if (this.sobrenome === undefined){
						$rootScope.secondNameValidate = false;
					}
					if (this.cpf === undefined){
						$rootScope.cpfValidate = false;
					}
			} else if (this.sobrenome === undefined){
				$rootScope.secondNameValidate = false;
					if(this.nome === undefined){
						$rootScope.firstNameValidate = false;
					}
					if (this.cpf === undefined){
						$rootScope.cpfValidate = false;
					}
			} else if (this.cpf === undefined){
				$rootScope.cpfValidate = false;
					if(this.nome === undefined){
						$rootScope.firstNameValidate = false;
					}
					if (this.sobrenome === undefined){
						$rootScope.secondNameValidate = false;
					}
			} else {
				// Redirect after save
				pessoa.$save(function(response) {
					$location.path('pessoas/' + response._id);

					// Clear form fields
					$scope.nome = '';
					$scope.sobrenome = '';
					$scope.cpf = '';
					$scope.dataNascimento = '';
					$scope.email = '';
					$scope.pai = '';
					$scope.mae = '';
					$scope.nacionalidade = '';
					$scope.naturalidade = '';
					$scope.pisPasep = '';
					$scope.dataAdmissao = '';
					$scope.dataDemissao = '';
					$scope.inss = '';
					$scope.nomeConjuge = '';
					$scope.nrRG = '';
					$scope.dataExpedicao = '';
					$scope.orgaoExpedidor = '';
					$scope.logradouro = '';
					$scope.nrLogradouro = '';
					$scope.complemento = '';
					$scope.cep = '';
					$scope.bairro = '';
					$scope.cidade = '';
					$scope.estado = '';
					$scope.nomeBanco = '';
					$scope.agencia = '';
					$scope.conta = '';
					$scope.nrCtps = '';
					$scope.trabalho = '';
					$scope.estado = '';
					$scope.regime = '';
					$scope.empresa = '';
					$scope.nomeEmpresa= '';
					$scope.nrCartao = '';
					$scope.residencia = '';
					$scope.celular = '';
					$scope.trabalho = '';
					$scope.percentual = '';
					$scope.grupoSocial = '';
					$rootScope.show = false;
					$rootScope.rendered = false;
					$scope.arrayCPF = [];
					$rootScope.valido = true;
					$rootScope.validoDependente = true;
					$rootScope.dataValida = true;
					$rootScope.dataNascimentoValida = true;
					$rootScope.dataAdmissaoValida = true;
					$rootScope.dataDemissaoValida = true;
					$rootScope.dataNascimentoDependenteValida = true;
					$rootScope.emailValidate = true;
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
		};

		/*
		** abre uma janela de confirmacao para o usuario caso o usuario confirme a pessoa sera excluida
		** caso contrario sera canelada a operacao
		*/
		$scope.ShowConfirm = function (pessoa) {
				if ($window.confirm('Confirma apagar o registro de')) {
					if ( pessoa ) {
						pessoa.$remove();

						for (var i in $scope.pessoas) {
							if ($scope.pessoas [i] === pessoa) {
								$scope.pessoas.splice(i, 1);
							}
						}
					} else {
						$scope.pessoa.$remove(function() {
							$location.path('pessoas');
						});
					}
				} else {
					console.log('Você Cancelou');
				}
		};

		// Remove existing Pessoa
		$scope.remove = function(pessoa) {
			if ( pessoa ) {
				pessoa.$remove();

				for (var i in $scope.pessoas) {
					if ($scope.pessoas [i] === pessoa) {
						$scope.pessoas.splice(i, 1);
					}
				}
			} else {
				$scope.pessoa.$remove(function() {
					$location.path('pessoas');
				});
			}
		};

		// Update existing Pessoa
		/*
		** a atualizacao e efetuada atraves do $scope.pessoa e dos outros atributos
		** desse modo todas as instancias sao setadas e efetuada a atualizacao
		*/
		$scope.update = function() {
			var pessoa = $scope.pessoa;

			$scope.rg = pessoa.rg;
			$scope.endereco = pessoa.endereco;
			$scope.banco = pessoa.banco;
			$scope.ctps = pessoa.ctps;
			$scope.telefone = this.telefone;
			$scope.estadoCivil = this.estadoCivil;
			$scope.cartaoMilhas = pessoa.cartaoMilhas;
			$scope.dependentes = pessoa.dependentes;

			pessoa.$update(function() {
				$location.path('pessoas/' + pessoa._id);
				$rootScope.show = false;
				$rootScope.rendered = false;
				$scope.arrayCPF = [];
				$rootScope.valido = true;
				$rootScope.validoDependente = true;
				$rootScope.dataValida = true;
				$rootScope.dataNascimentoValida = true;
				$rootScope.dataAdmissaoValida = true;
				$rootScope.dataDemissaoValida = true;
				$rootScope.dataNascimentoDependenteValida = true;
				$rootScope.emailValidate = true;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pessoas
		$scope.find = function() {
			$scope.pessoas = Pessoas.query();
		};

		// Find existing Pessoa
		$scope.findOne = function() {
			$scope.pessoa = Pessoas.get({
				pessoaId: $stateParams.pessoaId
			});
		};

		// #scope.findById({_id: 'Alice'}).remove().exec();
		$scope.getPessoas = function () {
		$http.get('/totalRegistros').success(function (response) {
			$scope.totalItems = response;
			$http.get('/pessoas/'+$scope.currentPage+'/'+$scope.itemsPerPage)
			    .success(function (response) {
					$scope.pessoas = response;
				})
				.error(function (response) {
				 	$scope.error = response.message;
			    });
			})
			.error(function (response) {
			   	$scope.error = response.message;
		    });
		};

	}
]);
