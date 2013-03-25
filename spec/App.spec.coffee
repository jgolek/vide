
request = require 'request'

App = require '../lib/App'


describe 'App', ->

	app = new App

	it 'should be able to start an app ', (done) ->
		app.start ->
			done()

	describe 'when server is running', ->
		app.loadPage = -> 
			page = toHtml: -> "START_PAGE"

		app.loadResource = ->
			resource = 
				all: ( params, callback ) -> callback [{'name':'foo'}]
				new: ( params, callback ) -> callback { 'name':'default' }
				get: ( params, callback ) -> callback { 'id': params.id }
				create: ( params, callback ) ->
					params.data.status = 'new'
					callback( params.data )
					console.log( typeof(params.data) )
					return


		it 'should get the "start" http page', (done) -> 
			request.get 'http://localhost:3000/start', (err, res, body) ->
				expect(res.statusCode).toBe(200)
				expect(body).toBe("START_PAGE")
				done()

		it 'should get "resource/foo" per http', (done) -> 
		 	request.get 'http://localhost:3000/resource/foo', (err, res, body) ->
		 		expect(res.statusCode).toBe(200)
		 		expect(JSON.parse(body)).toEqual([{'name':'foo'}])
		 		done()

		it 'should get "resource/foo/new" per http', (done) -> 
			request.get 'http://localhost:3000/resource/foo/new', (err, res, body) ->
				expect(res.statusCode).toBe(200)
				expect(JSON.parse(body)).toEqual({ 'name':'default' })
				done()

		it 'should get "resource/foo/11" per http', (done) -> 
			request.get {url: 'http://localhost:3000/resource/foo/11', json: true }, (err, res, body) ->
				expect(res.statusCode).toBe(200)
				expect(body).toEqual({ 'id': '11' })
				done()

		it 'should be able to create a new resource instance via http', (done) -> 
			request.post {url: 'http://localhost:3000/resource/foo', body: {'foo': 'bar'}, json: true }, (err, res, body) ->
				console.log res.headers['content-type']
				expect(res.statusCode).toBe(200)
				expect(body).toEqual( { 'foo': 'bar', 'status': 'new' } )
				done()

	it 'should be able to stop an app', (done) ->
		app.stop()
		done();


