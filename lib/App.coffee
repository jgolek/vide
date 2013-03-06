
module.exports = class App
	constructor: ->

	start: (callback) ->
		express = require 'express'
		resourcesAdapter = require '../modules/resource'

		app = express()
		app.use express.bodyParser()

		#resourcesAdapter app:app, directory

		app.listen 3000, callback

