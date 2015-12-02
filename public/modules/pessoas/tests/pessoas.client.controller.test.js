'use strict';

(function() {
	// Pessoas Controller Spec
	describe('Pessoas Controller Tests', function() {
		// Initialize global variables
		var PessoasController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Pessoas controller.
			PessoasController = $controller('PessoasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pessoa object fetched from XHR', inject(function(Pessoas) {
			// Create sample Pessoa using the Pessoas service
			var samplePessoa = new Pessoas({
				name: 'New Pessoa'
			});

			// Create a sample Pessoas array that includes the new Pessoa
			var samplePessoas = [samplePessoa];

			// Set GET response
			$httpBackend.expectGET('pessoas').respond(samplePessoas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pessoas).toEqualData(samplePessoas);
		}));

		it('$scope.findOne() should create an array with one Pessoa object fetched from XHR using a pessoaId URL parameter', inject(function(Pessoas) {
			// Define a sample Pessoa object
			var samplePessoa = new Pessoas({
				name: 'New Pessoa'
			});

			// Set the URL parameter
			$stateParams.pessoaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pessoas\/([0-9a-fA-F]{24})$/).respond(samplePessoa);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pessoa).toEqualData(samplePessoa);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pessoas) {
			// Create a sample Pessoa object
			var samplePessoaPostData = new Pessoas({
				name: 'New Pessoa'
			});

			// Create a sample Pessoa response
			var samplePessoaResponse = new Pessoas({
				_id: '525cf20451979dea2c000001',
				name: 'New Pessoa'
			});

			// Fixture mock form input values
			scope.name = 'New Pessoa';

			// Set POST response
			$httpBackend.expectPOST('pessoas', samplePessoaPostData).respond(samplePessoaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pessoa was created
			expect($location.path()).toBe('/pessoas/' + samplePessoaResponse._id);
		}));

		it('$scope.update() should update a valid Pessoa', inject(function(Pessoas) {
			// Define a sample Pessoa put data
			var samplePessoaPutData = new Pessoas({
				_id: '525cf20451979dea2c000001',
				name: 'New Pessoa'
			});

			// Mock Pessoa in scope
			scope.pessoa = samplePessoaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pessoas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pessoas/' + samplePessoaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pessoaId and remove the Pessoa from the scope', inject(function(Pessoas) {
			// Create new Pessoa object
			var samplePessoa = new Pessoas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pessoas array and include the Pessoa
			scope.pessoas = [samplePessoa];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pessoas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePessoa);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pessoas.length).toBe(0);
		}));
	});
}());