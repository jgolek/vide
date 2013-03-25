
request = require 'request'

WidgetsApp = require './lib/WidgetsApp'


describe 'WidgetsApp when its running', ->

	app = new WidgetsApp
	app.start()

	it 'should get the "start" http page', (done) -> 
		request 'http://localhost:3000/', (err, res, body) ->
			expect(res.statusCode).toBe(200)
			expect(body).toBe("START_PAGE")
			done()

	it 'should get "resource/foo" per http', (done) -> 
		request 'http://localhost:3000/resource/demo_widget', (err, res, body) ->
			expect(res.statusCode).toBe(200)
			expect(JSON.parse(body)).toEqual([{'name':'foo'}])
			done()

	it 'should be able to stop this app', (done) ->
		app.stop()
		done();


