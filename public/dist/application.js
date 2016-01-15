"use strict";var ApplicationConfiguration=function(){var applicationModuleName="gerpessoal",applicationModuleVendorDependencies=["ngResource","ngCookies","ngAnimate","ngTouch","ngSanitize","ui.router","ui.bootstrap","ui.utils"],registerModule=function(moduleName,dependencies){angular.module(moduleName,dependencies||[]),angular.module(applicationModuleName).requires.push(moduleName)};return{applicationModuleName:applicationModuleName,applicationModuleVendorDependencies:applicationModuleVendorDependencies,registerModule:registerModule}}();angular.module(ApplicationConfiguration.applicationModuleName,ApplicationConfiguration.applicationModuleVendorDependencies),angular.module(ApplicationConfiguration.applicationModuleName).config(["$locationProvider",function($locationProvider){$locationProvider.hashPrefix("!")}]),angular.element(document).ready(function(){"#_=_"===window.location.hash&&(window.location.hash="#!"),angular.bootstrap(document,[ApplicationConfiguration.applicationModuleName])}),ApplicationConfiguration.registerModule("articles"),ApplicationConfiguration.registerModule("core"),ApplicationConfiguration.registerModule("pessoas"),ApplicationConfiguration.registerModule("users"),angular.module("articles").config(["$stateProvider",function($stateProvider){$stateProvider.state("listArticles",{url:"/articles",templateUrl:"modules/articles/views/list-articles.client.view.html",controller:"ArticleAuthorizationController"}).state("createArticle",{url:"/articles/create",templateUrl:"modules/articles/views/create-article.client.view.html"}).state("viewArticle",{url:"/articles/:articleId",templateUrl:"modules/articles/views/view-article.client.view.html"}).state("editArticle",{url:"/articles/:articleId/edit",templateUrl:"modules/articles/views/edit-article.client.view.html"})}]),angular.module("articles").controller("ArticleAuthorizationController",["$scope","$stateParams","$location","Authentication","Articles",function($scope,$stateParams,$location,Authentication,Articles){$scope.authentication=Authentication,-1!==$scope.authentication.user.roles.indexOf("admin")?console.log("Estou no IF"):console.log("Estou no ELSE")}]),angular.module("articles").controller("ArticlesController",["$scope","$stateParams","$location","Authentication","Articles",function($scope,$stateParams,$location,Authentication,Articles){$scope.authentication=Authentication,$scope.create=function(){var article=new Articles({title:this.title,content:this.content});article.$save(function(response){$location.path("articles/"+response._id),$scope.title="",$scope.content=""},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.remove=function(article){if(article){article.$remove();for(var i in $scope.articles)$scope.articles[i]===article&&$scope.articles.splice(i,1)}else $scope.article.$remove(function(){$location.path("articles")})},$scope.update=function(){var article=$scope.article;article.$update(function(){$location.path("articles/"+article._id)},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.find=function(){$scope.articles=Articles.query()},$scope.findOne=function(){$scope.article=Articles.get({articleId:$stateParams.articleId})}}]),angular.module("articles").factory("Articles",["$resource",function($resource){return $resource("articles/:articleId",{articleId:"@_id"},{update:{method:"PUT"}})}]),angular.module("core").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("home",{url:"/",templateUrl:"modules/core/views/home.client.view.html"})}]),angular.module("core").controller("HeaderController",["$scope","Authentication","Menus",function($scope,Authentication,Menus){$scope.authentication=Authentication,$scope.isCollapsed=!1,$scope.menu=Menus.getMenu("topbar"),$scope.toggleCollapsibleMenu=function(){$scope.isCollapsed=!$scope.isCollapsed},$scope.$on("$stateChangeSuccess",function(){$scope.isCollapsed=!1})}]),angular.module("core").controller("HomeController",["$scope","$location","Authentication",function($scope,$location,Authentication){$scope.authentication=Authentication,$scope.alerts=[{icon:"glyphicon-user",colour:"btn-success",total:"Gerente Pessoal",description:"TOTAL CUSTOMERS"},{icon:"glyphicon-calendar",colour:"btn-primary",total:"Fundação Trompowsky",description:"UPCOMING EVENTS"}]}]),angular.module("core").service("Menus",[function(){this.defaultRoles=["*"],this.menus={};var shouldRender=function(user){if(!user)return this.isPublic;if(~this.roles.indexOf("*"))return!0;for(var userRoleIndex in user.roles)for(var roleIndex in this.roles)if(this.roles[roleIndex]===user.roles[userRoleIndex])return!0;return!1};this.validateMenuExistance=function(menuId){if(menuId&&menuId.length){if(this.menus[menuId])return!0;throw new Error("Menu does not exists")}throw new Error("MenuId was not provided")},this.getMenu=function(menuId){return this.validateMenuExistance(menuId),this.menus[menuId]},this.addMenu=function(menuId,isPublic,roles){return this.menus[menuId]={isPublic:isPublic||!1,roles:roles||this.defaultRoles,items:[],shouldRender:shouldRender},this.menus[menuId]},this.removeMenu=function(menuId){this.validateMenuExistance(menuId),delete this.menus[menuId]},this.addMenuItem=function(menuId,menuItemTitle,menuItemURL,menuItemType,menuItemUIRoute,isPublic,roles,position){return this.validateMenuExistance(menuId),this.menus[menuId].items.push({title:menuItemTitle,link:menuItemURL,menuItemType:menuItemType||"item",menuItemClass:menuItemType,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].roles:roles,position:position||0,items:[],shouldRender:shouldRender}),this.menus[menuId]},this.addSubMenuItem=function(menuId,rootMenuItemURL,menuItemTitle,menuItemURL,menuItemUIRoute,isPublic,roles,position){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===rootMenuItemURL&&this.menus[menuId].items[itemIndex].items.push({title:menuItemTitle,link:menuItemURL,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].items[itemIndex].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].items[itemIndex].roles:roles,position:position||0,shouldRender:shouldRender});return this.menus[menuId]},this.removeMenuItem=function(menuId,menuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===menuItemURL&&this.menus[menuId].items.splice(itemIndex,1);return this.menus[menuId]},this.removeSubMenuItem=function(menuId,submenuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)for(var subitemIndex in this.menus[menuId].items[itemIndex].items)this.menus[menuId].items[itemIndex].items[subitemIndex].link===submenuItemURL&&this.menus[menuId].items[itemIndex].items.splice(subitemIndex,1);return this.menus[menuId]},this.addMenu("topbar")}]);var BrM=require("br-masks"),m=angular.module("idf.br-filters",[]);module.exports=m.name,m.filter("percentage",["$filter",function($filter){return function(input,decimals){return angular.isUndefined(input)||null===input?input:$filter("number")(100*input,decimals)+"%"}}]).filter("brCep",[function(){return function(input){return BrM.cep(input)}}]).filter("brPhoneNumber",[function(){return function(input){return BrM.phone(input)}}]).filter("brCpf",[function(){return function(input){return BrM.cpf(input)}}]).filter("brCnpj",[function(){return function(input){return BrM.cnpj(input)}}]).filter("brCpfCnpj",[function(){return function(input){return BrM.cpfCnpj(input)}}]).filter("brIe",[function(){return function(input,uf){return BrM.ie(input,uf)}}]).filter("finance",["$locale",function($locale){return function(input,currency,decimals){if(angular.isUndefined(input)||null===input)return input;var decimalDelimiter=$locale.NUMBER_FORMATS.DECIMAL_SEP,thousandsDelimiter=$locale.NUMBER_FORMATS.GROUP_SEP,currencySym="";return currency===!0?currencySym=$locale.NUMBER_FORMATS.CURRENCY_SYM+" ":currency&&(currencySym=currency),currencySym+BrM.finance(input,decimals,decimalDelimiter,thousandsDelimiter)}}]).filter("nfeAccessKey",[function(){return function(input){return BrM.nfeAccessKey(input)}}]),angular.module("pessoas").run(["Menus",function(Menus){Menus.addMenuItem("topbar","Pessoas","pessoas","dropdown","/pessoas(/create)?"),Menus.addSubMenuItem("topbar","pessoas","Listar Pessoas","pessoas"),Menus.addSubMenuItem("topbar","pessoas","Cadastrar Pessoas","pessoas/create")}]),angular.module("pessoas").config(["$stateProvider",function($stateProvider){$stateProvider.state("listPessoas",{url:"/pessoas",templateUrl:"modules/pessoas/views/list-pessoas.client.view.html"}).state("createPessoa",{url:"/pessoas/create",templateUrl:"modules/pessoas/views/create-pessoa.client.view.html"}).state("viewPessoa",{url:"/pessoas/:pessoaId",templateUrl:"modules/pessoas/views/view-pessoa.client.view.html"}).state("editPessoa",{url:"/pessoas/:pessoaId/edit",templateUrl:"modules/pessoas/views/edit-pessoa.client.view.html"})}]),angular.module("pessoas").controller("PessoasController",["$scope","$stateParams","$location","Authentication","Pessoas","$http","$window","$rootScope",function($scope,$stateParams,$location,Authentication,Pessoas,$http,$window,$rootScope){$scope.authentication=Authentication,$scope.arrayDependentes=[];new Pessoas;$rootScope.show=!1,$rootScope.rendered=!1,$scope.arrayCPF=[];var resultadoPrimeiroNumero=0,resultadoSegundoNumero=0,j=10,pDigito=0,sDigito=0,primeiroDigito=0,segundoDigito=0,booleano=!1;$rootScope.valido=!0,$rootScope.validoDependente=!0;var dia,mes,ano;$rootScope.dataValida=!0,$rootScope.dataNascimentoValida=!0,$rootScope.dataAdmissaoValida=!0,$rootScope.dataDemissaoValida=!0,$rootScope.dataNascimentoDependenteValida=!0;var emailCheck;$rootScope.emailValidate=!0,$rootScope.firstNameValidate=!0,$rootScope.secondNameValidate=!0,$rootScope.cpfValidate=!0,$scope.nameValidate=function(valor){void 0!==valor?$rootScope.firstNameValidate=!0:$rootScope.firstNameValidate=!1},$scope.secNameValidate=function(valor){void 0!==valor||""!==valor?$rootScope.secondNameValidate=!0:$rootScope.secondNameValidate=!1},$scope.validateEmail=function(valor){emailCheck=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,emailCheck.test(valor)?$rootScope.emailValidate=!0:$rootScope.emailValidate=!1},$scope.validateData=function(valor){dia=valor.substring(0,2),mes=valor.substring(2,4),ano=valor.substring(4,9),ano>1900&&5100>ano&&(dia>0&&31>dia&&mes>0&&12>mes?("04"===mes||"06"===mes||"09"===mes||11===mes)&&dia>30?$scope.dataValida=!1:"02"===mes?ano%4===0&&dia>29?$scope.dataValida=!1:ano%4!==0&&dia>28?$scope.dataValida=!1:$scope.dataValida=!0:$scope.dataValida=!0:$scope.dataValida=!1)},$scope.validateDataNascimento=function(valor){dia=valor.substring(0,2),mes=valor.substring(2,4),ano=valor.substring(4,9),ano>1900&&5100>ano&&(dia>0&&31>dia&&mes>0&&12>mes?("04"===mes||"06"===mes||"09"===mes||11===mes)&&dia>30?$scope.dataNascimentoValida=!1:"02"===mes?ano%4===0&&dia>29?$scope.dataNascimentoValida=!1:ano%4!==0&&dia>28?$scope.dataNascimentoValida=!1:$scope.dataNascimentoValida=!0:$scope.dataNascimentoValida=!0:$scope.dataNascimentoValida=!1)},$scope.validateDataAdmissao=function(valor){dia=valor.substring(0,2),mes=valor.substring(2,4),ano=valor.substring(4,9),ano>1900&&5100>ano&&(dia>0&&31>dia&&mes>0&&12>mes?("04"===mes||"06"===mes||"09"===mes||11===mes)&&dia>30?$scope.dataAdmissaoValida=!1:"02"===mes?ano%4===0&&dia>29?$scope.dataAdmissaoValida=!1:ano%4!==0&&dia>28?$scope.dataAdmissaoValida=!1:$scope.dataAdmissaoValida=!0:$scope.dataAdmissaoValida=!0:$scope.dataAdmissaoValida=!1)},$scope.validateDataDemissao=function(valor){dia=valor.substring(0,2),mes=valor.substring(2,4),ano=valor.substring(4,9),ano>1900&&5100>ano&&(dia>0&&31>dia&&mes>0&&12>mes?("04"===mes||"06"===mes||"09"===mes||11===mes)&&dia>30?$scope.dataDemissaoValida=!1:"02"===mes?ano%4===0&&dia>29?$scope.dataDemissaoValida=!1:ano%4!==0&&dia>28?$scope.dataDemissaoValida=!1:$scope.dataDemissaoValida=!0:$scope.dataDemissaoValida=!0:$scope.dataDemissaoValida=!1)},$scope.validateDataNascimentoDependente=function(valor){dia=valor.substring(0,2),mes=valor.substring(2,4),ano=valor.substring(4,9),ano>1900&&5100>ano&&(dia>0&&31>dia&&mes>0&&12>mes?("04"===mes||"06"===mes||"09"===mes||11===mes)&&dia>30?$scope.dataNascimentoDependenteValida=!1:"02"===mes?ano%4===0&&dia>29?$scope.dataNascimentoDependenteValida=!1:ano%4!==0&&dia>28?$scope.dataNascimentoDependenteValida=!1:$scope.dataNascimentoDependenteValida=!0:$scope.dataNascimentoDependenteValida=!0:$scope.dataNascimentoDependenteValida=!1)},$scope.validateCPF=function(valor){pDigito=0,sDigito=0,resultadoPrimeiroNumero=0,resultadoSegundoNumero=0,j=10;var numero=valor.toString();if("00000000000"===valor||"11111111111"===valor||"22222222222"===valor||"33333333333"===valor||"44444444444"===valor||"55555555555"===valor||"66666666666"===valor||"77777777777"===valor||"88888888888"===valor||"99999999999"===valor)$rootScope.valido=!1,booleano=!1;else{for(var i=0;9>i;i++)resultadoPrimeiroNumero+=numero.charAt(i)*j,j--;if(pDigito=10*resultadoPrimeiroNumero%11===10||10*resultadoPrimeiroNumero%11===11?0:10*resultadoPrimeiroNumero%11,primeiroDigito=parseInt(valor.charAt(9)),pDigito===primeiroDigito){j=11;for(var k=0;10>k;k++)resultadoSegundoNumero+=numero.charAt(k)*j,j--;sDigito=10*resultadoSegundoNumero%11===10||10*resultadoSegundoNumero%11===11?0:10*resultadoSegundoNumero%11,segundoDigito=parseInt(numero.charAt(10)),booleano=sDigito===segundoDigito?!0:!1}}$rootScope.valido=booleano},$scope.validateCPFDependente=function(valor){pDigito=0,sDigito=0,resultadoPrimeiroNumero=0,resultadoSegundoNumero=0,j=10;var numero=valor.toString();if("00000000000"===valor||"11111111111"===valor||"22222222222"===valor||"33333333333"===valor||"44444444444"===valor||"55555555555"===valor||"66666666666"===valor||"77777777777"===valor||"88888888888"===valor||"99999999999"===valor)$rootScope.valido=!1,booleano=!1;else{for(var i=0;9>i;i++)resultadoPrimeiroNumero+=numero.charAt(i)*j,j--;if(pDigito=10*resultadoPrimeiroNumero%11===10||10*resultadoPrimeiroNumero%11===11?0:10*resultadoPrimeiroNumero%11,primeiroDigito=parseInt(valor.charAt(9)),pDigito===primeiroDigito){j=11;for(var k=0;10>k;k++)resultadoSegundoNumero+=numero.charAt(k)*j,j--;sDigito=10*resultadoSegundoNumero%11===10||10*resultadoSegundoNumero%11===11?0:10*resultadoSegundoNumero%11,segundoDigito=parseInt(numero.charAt(10)),booleano=sDigito===segundoDigito?!0:!1}}$rootScope.valido=booleano},$scope.visibity=function(){$rootScope.show===!1?$rootScope.show=!0:($rootScope.show=!1,$scope.arrayDependentes=[]),console.log($rootScope.show)},$scope.renderedEdit=function(){$rootScope.rendered===!1?$rootScope.rendered=!0:$rootScope.rendered=!1},$scope.addArray=function(dependentes){$scope.arrayDependentes.push({nomeDependente:dependentes.nomeDependente,parentesco:dependentes.parentesco,cpfDependente:dependentes.cpfDependente,dataNascimentoDependente:dependentes.dataNascimentoDependente}),dependentes.nomeDependente="",dependentes.parentesco="",dependentes.cpfDependente="",dependentes.dataNascimentoDependente=""},$scope.selecionado=function(dependentes){$scope.dependentes=dependentes,$rootScope.rendered=!0},$scope.clear=function(dependentes){$rootScope.rendered=!1,$scope.arrayDependentes.push({nomeDependente:dependentes.nomeDependente,parentesco:dependentes.parentesco,cpfDependente:dependentes.cpfDependente,dataNascimentoDependente:dependentes.dataNascimentoDependente}),dependentes.nomeDependente="",dependentes.parentesco="",dependentes.cpfDependente="",dependentes.dataNascimentoDependente="";var index=$scope.arrayDependentes.indexOf(dependentes);$scope.arrayDependentes.splice(index,1)},$scope.deletarItemArray=function(dependentes){var index=$scope.arrayDependentes.indexOf(dependentes);$scope.arrayDependentes.splice(index,1)},$scope.edtArray=function(dependentes){$scope.arrayDependentes.push({nomeDependente:dependentes.nomeDependente,parentesco:dependentes.parentesco,cpfDependente:dependentes.cpfDependente,dataNascimentoDependente:dependentes.dataNascimentoDependente}),dependentes.nomeDependente="",dependentes.parentesco="",dependentes.cpfDependente="",dependentes.dataNascimentoDependente="";var index=$scope.arrayDependentes.indexOf(dependentes);$scope.arrayDependentes.splice(index,1),$rootScope.rendered=!1},$scope.create=function(){var pessoa=new Pessoas({nome:this.nome,sobrenome:this.sobrenome,cpf:this.cpf,dataNascimento:this.dataNascimento,email:this.email,pai:this.pai,mae:this.mae,nacionalidade:this.nacionalidade,naturalidade:this.naturalidade,pisPasep:this.pisPasep,dataAdmissao:this.dataAdmissao,dataDemissao:this.dataDemissao,inss:this.inss,nomeConjuge:this.nomeConjuge,rg:this.rg,endereco:this.endereco,banco:this.banco,ctps:this.ctps,telefone:this.telefone,estadoCivil:this.estadoCivil,cartaoMilhas:this.cartaoMilhas,percentual:this.percentual,dependentes:$scope.arrayDependentes});void 0===this.nome?($rootScope.firstNameValidate=!1,void 0===this.sobrenome&&($rootScope.secondNameValidate=!1),void 0===this.cpf&&($rootScope.cpfValidate=!1)):void 0===this.sobrenome?($rootScope.secondNameValidate=!1,void 0===this.nome&&($rootScope.firstNameValidate=!1),void 0===this.cpf&&($rootScope.cpfValidate=!1)):void 0===this.cpf?($rootScope.cpfValidate=!1,void 0===this.nome&&($rootScope.firstNameValidate=!1),void 0===this.sobrenome&&($rootScope.secondNameValidate=!1)):pessoa.$save(function(response){$location.path("pessoas/"+response._id),$scope.nome="",$scope.sobrenome="",$scope.cpf="",$scope.dataNascimento="",$scope.email="",$scope.pai="",$scope.mae="",$scope.nacionalidade="",$scope.naturalidade="",$scope.pisPasep="",$scope.dataAdmissao="",$scope.dataDemissao="",$scope.inss="",$scope.nomeConjuge="",$scope.nrRG="",$scope.dataExpedicao="",$scope.orgaoExpedidor="",$scope.logradouro="",$scope.nrLogradouro="",$scope.complemento="",$scope.cep="",$scope.bairro="",$scope.cidade="",$scope.estado="",$scope.nomeBanco="",$scope.agencia="",$scope.conta="",$scope.nrCtps="",$scope.trabalho="",$scope.estado="",$scope.regime="",$scope.empresa="",$scope.nomeEmpresa="",$scope.nrCartao="",$scope.residencia="",$scope.celular="",$scope.trabalho="",$scope.percentual="",$rootScope.show=!1,$rootScope.rendered=!1,$scope.arrayCPF=[],$rootScope.valido=!0,$rootScope.validoDependente=!0,$rootScope.dataValida=!0,$rootScope.dataNascimentoValida=!0,$rootScope.dataAdmissaoValida=!0,$rootScope.dataDemissaoValida=!0,$rootScope.dataNascimentoDependenteValida=!0,$rootScope.emailValidate=!0},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.ShowConfirm=function(pessoa){if($window.confirm("Confirma apagar o registro de"))if(pessoa){pessoa.$remove();for(var i in $scope.pessoas)$scope.pessoas[i]===pessoa&&$scope.pessoas.splice(i,1)}else $scope.pessoa.$remove(function(){$location.path("pessoas")});else console.log("Você Cancelou")},$scope.remove=function(pessoa){if(pessoa){pessoa.$remove();for(var i in $scope.pessoas)$scope.pessoas[i]===pessoa&&$scope.pessoas.splice(i,1)}else $scope.pessoa.$remove(function(){$location.path("pessoas")})},$scope.update=function(){var pessoa=$scope.pessoa;$scope.rg=pessoa.rg,$scope.endereco=pessoa.endereco,$scope.banco=pessoa.banco,$scope.ctps=pessoa.ctps,$scope.telefone=this.telefone,$scope.estadoCivil=this.estadoCivil,$scope.cartaoMilhas=pessoa.cartaoMilhas,$scope.dependentes=pessoa.dependentes,pessoa.$update(function(){$location.path("pessoas/"+pessoa._id),$rootScope.show=!1,$rootScope.rendered=!1,$scope.arrayCPF=[],$rootScope.valido=!0,$rootScope.validoDependente=!0,$rootScope.dataValida=!0,$rootScope.dataNascimentoValida=!0,$rootScope.dataAdmissaoValida=!0,$rootScope.dataDemissaoValida=!0,$rootScope.dataNascimentoDependenteValida=!0,$rootScope.emailValidate=!0},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.find=function(){$scope.pessoas=Pessoas.query()},$scope.findOne=function(){$scope.pessoa=Pessoas.get({pessoaId:$stateParams.pessoaId})},$scope.getPessoas=function(){$http.get("/totalRegistros").success(function(response){$scope.totalItems=response,$http.get("/pessoas/"+$scope.currentPage+"/"+$scope.itemsPerPage).success(function(response){$scope.pessoas=response}).error(function(response){$scope.error=response.message})}).error(function(response){$scope.error=response.message})}}]),angular.module("pessoas").factory("Pessoas",["$resource",function($resource){return $resource("pessoas/:pessoaId",{pessoaId:"@_id"},{update:{method:"PUT"}})}]),angular.module("users").config(["$httpProvider",function($httpProvider){$httpProvider.interceptors.push(["$q","$location","Authentication",function($q,$location,Authentication){return{responseError:function(rejection){switch(rejection.status){case 401:Authentication.user=null,$location.path("signin");break;case 403:}return $q.reject(rejection)}}}])}]),angular.module("users").config(["$stateProvider",function($stateProvider){$stateProvider.state("profile",{url:"/settings/profile",templateUrl:"modules/users/views/settings/edit-profile.client.view.html"}).state("password",{url:"/settings/password",templateUrl:"modules/users/views/settings/change-password.client.view.html"}).state("accounts",{url:"/settings/accounts",templateUrl:"modules/users/views/settings/social-accounts.client.view.html"}).state("signup",{url:"/signup",templateUrl:"modules/users/views/authentication/signup.client.view.html"}).state("signin",{url:"/signin",templateUrl:"modules/users/views/authentication/signin.client.view.html"}).state("forgot",{url:"/password/forgot",templateUrl:"modules/users/views/password/forgot-password.client.view.html"}).state("reset-invalid",{url:"/password/reset/invalid",templateUrl:"modules/users/views/password/reset-password-invalid.client.view.html"}).state("reset-success",{url:"/password/reset/success",templateUrl:"modules/users/views/password/reset-password-success.client.view.html"}).state("reset",{url:"/password/reset/:token",templateUrl:"modules/users/views/password/reset-password.client.view.html"})}]),angular.module("users").controller("AuthenticationController",["$scope","$http","$location","Authentication",function($scope,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.signup=function(){$http.post("/auth/signup",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})},$scope.signin=function(){$http.post("/auth/signin",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("PasswordController",["$scope","$stateParams","$http","$location","Authentication",function($scope,$stateParams,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.askForPasswordReset=function(){$scope.success=$scope.error=null,$http.post("/auth/forgot",$scope.credentials).success(function(response){$scope.credentials=null,$scope.success=response.message}).error(function(response){$scope.credentials=null,$scope.error=response.message})},$scope.resetUserPassword=function(){$scope.success=$scope.error=null,$http.post("/auth/reset/"+$stateParams.token,$scope.passwordDetails).success(function(response){$scope.passwordDetails=null,Authentication.user=response,$location.path("/password/reset/success")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("SettingsController",["$scope","$http","$location","Users","Authentication",function($scope,$http,$location,Users,Authentication){$scope.user=Authentication.user,$scope.user||$location.path("/"),$scope.hasConnectedAdditionalSocialAccounts=function(provider){for(var i in $scope.user.additionalProvidersData)return!0;return!1},$scope.isConnectedSocialAccount=function(provider){return $scope.user.provider===provider||$scope.user.additionalProvidersData&&$scope.user.additionalProvidersData[provider]},$scope.removeUserSocialAccount=function(provider){$scope.success=$scope.error=null,$http["delete"]("/users/accounts",{params:{provider:provider}}).success(function(response){$scope.success=!0,$scope.user=Authentication.user=response}).error(function(response){$scope.error=response.message})},$scope.updateUserProfile=function(isValid){if(isValid){$scope.success=$scope.error=null;var user=new Users($scope.user);user.$update(function(response){$scope.success=!0,Authentication.user=response},function(response){$scope.error=response.data.message})}else $scope.submitted=!0},$scope.changeUserPassword=function(){$scope.success=$scope.error=null,$http.post("/users/password",$scope.passwordDetails).success(function(response){$scope.success=!0,$scope.passwordDetails=null}).error(function(response){$scope.error=response.message})}}]),angular.module("users").factory("Authentication",[function(){var _this=this;return _this._data={user:window.user},_this._data}]),angular.module("users").factory("Users",["$resource",function($resource){return $resource("users",{},{update:{method:"PUT"}})}]);