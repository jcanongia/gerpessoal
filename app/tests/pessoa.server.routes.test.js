'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pessoa = mongoose.model('Pessoa'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pessoa;

/**
 * Pessoa routes tests
 */
describe('Pessoa CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Pessoa
		user.save(function() {
			pessoa = {
				name: 'Pessoa Name'
			};

			done();
		});
	});

	it('should be able to save Pessoa instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pessoa
				agent.post('/pessoas')
					.send(pessoa)
					.expect(200)
					.end(function(pessoaSaveErr, pessoaSaveRes) {
						// Handle Pessoa save error
						if (pessoaSaveErr) done(pessoaSaveErr);

						// Get a list of Pessoas
						agent.get('/pessoas')
							.end(function(pessoasGetErr, pessoasGetRes) {
								// Handle Pessoa save error
								if (pessoasGetErr) done(pessoasGetErr);

								// Get Pessoas list
								var pessoas = pessoasGetRes.body;

								// Set assertions
								(pessoas[0].user._id).should.equal(userId);
								(pessoas[0].name).should.match('Pessoa Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pessoa instance if not logged in', function(done) {
		agent.post('/pessoas')
			.send(pessoa)
			.expect(401)
			.end(function(pessoaSaveErr, pessoaSaveRes) {
				// Call the assertion callback
				done(pessoaSaveErr);
			});
	});

	it('should not be able to save Pessoa instance if no name is provided', function(done) {
		// Invalidate name field
		pessoa.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pessoa
				agent.post('/pessoas')
					.send(pessoa)
					.expect(400)
					.end(function(pessoaSaveErr, pessoaSaveRes) {
						// Set message assertion
						(pessoaSaveRes.body.message).should.match('Please fill Pessoa name');
						
						// Handle Pessoa save error
						done(pessoaSaveErr);
					});
			});
	});

	it('should be able to update Pessoa instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pessoa
				agent.post('/pessoas')
					.send(pessoa)
					.expect(200)
					.end(function(pessoaSaveErr, pessoaSaveRes) {
						// Handle Pessoa save error
						if (pessoaSaveErr) done(pessoaSaveErr);

						// Update Pessoa name
						pessoa.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pessoa
						agent.put('/pessoas/' + pessoaSaveRes.body._id)
							.send(pessoa)
							.expect(200)
							.end(function(pessoaUpdateErr, pessoaUpdateRes) {
								// Handle Pessoa update error
								if (pessoaUpdateErr) done(pessoaUpdateErr);

								// Set assertions
								(pessoaUpdateRes.body._id).should.equal(pessoaSaveRes.body._id);
								(pessoaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pessoas if not signed in', function(done) {
		// Create new Pessoa model instance
		var pessoaObj = new Pessoa(pessoa);

		// Save the Pessoa
		pessoaObj.save(function() {
			// Request Pessoas
			request(app).get('/pessoas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pessoa if not signed in', function(done) {
		// Create new Pessoa model instance
		var pessoaObj = new Pessoa(pessoa);

		// Save the Pessoa
		pessoaObj.save(function() {
			request(app).get('/pessoas/' + pessoaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pessoa.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pessoa instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pessoa
				agent.post('/pessoas')
					.send(pessoa)
					.expect(200)
					.end(function(pessoaSaveErr, pessoaSaveRes) {
						// Handle Pessoa save error
						if (pessoaSaveErr) done(pessoaSaveErr);

						// Delete existing Pessoa
						agent.delete('/pessoas/' + pessoaSaveRes.body._id)
							.send(pessoa)
							.expect(200)
							.end(function(pessoaDeleteErr, pessoaDeleteRes) {
								// Handle Pessoa error error
								if (pessoaDeleteErr) done(pessoaDeleteErr);

								// Set assertions
								(pessoaDeleteRes.body._id).should.equal(pessoaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pessoa instance if not signed in', function(done) {
		// Set Pessoa user 
		pessoa.user = user;

		// Create new Pessoa model instance
		var pessoaObj = new Pessoa(pessoa);

		// Save the Pessoa
		pessoaObj.save(function() {
			// Try deleting Pessoa
			request(app).delete('/pessoas/' + pessoaObj._id)
			.expect(401)
			.end(function(pessoaDeleteErr, pessoaDeleteRes) {
				// Set message assertion
				(pessoaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pessoa error error
				done(pessoaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pessoa.remove().exec();
		done();
	});
});