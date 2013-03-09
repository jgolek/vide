
module.exports = class App

	constructor: ->
		@pages = {}
		console.log 'start app'

	start: (callback) ->
		express = require 'express'
		fs = require 'fs'
		path = require 'path'
		resourcesAdapter = require '../modules/resource'

		app = express()
		app.use express.bodyParser()

		memoryModels = {}

		for pageName, page of @pages
			for type in page.getRequiredTypes()
				memoryModels[type.name] = type.dbmodel

		resourcesAdapter app: app, models: memoryModels

		app.get '/favicon.ico', (req, res) -> res.send()

		app.get '/:page', (req, res) =>
			#console.log 'page:', @pages[req.params.page] # TODO validation
			res.send @pages[req.params.page].toHtml()

		app.get '/modules/*', (req, res) =>
			filePath = __dirname + '/../' + req.url
			#console.log 'file path', filePath
			fs.readFile filePath, 'utf8', (err, file) ->
				switch path.extname(filePath)
					when '.js' then res.set('Content-Type', 'text/javascript');
					when '.css' then res.set('Content-Type', 'text/css');
				
				res.send file ? err

		app.listen 3000, callback




