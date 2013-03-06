
module.exports = class App

	constructor: ->
		@pages = {}
		console.log 'start app'

	start: (callback) ->
		express = require 'express'
		fs = require 'fs'
		resourcesAdapter = require '../modules/resource'

		app = express()
		app.use express.bodyParser()




		resourcesAdapter app: app, models: memoryModels

		app.get '/favicon.ico', (req, res) -> res.send()

		app.get '/:page', (req, res) =>
			#console.log 'page:', @pages[req.params.page] # TODO validation
			res.send @pages[req.params.page].toHtml()

		app.get '/modules/*', (req, res) =>
			filePath = __dirname + '/../' + req.url
			#console.log 'file path', filePath
			fs.readFile filePath, 'utf8', (err, file) ->
				res.send file ? err

		app.listen 3000, callback




