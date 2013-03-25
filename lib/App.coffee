
module.exports = class App

	#
	# data.appDirectory 
	#
	constructor: (data) ->
		@pages = {}
		@server = undefined
		@startPage = data?.startPage || 'start'
		if data?.directory
			@appDirectory = data.directory
			@pagesDirectory = data.directory + '/pages/'

	loadPage: (pageName, options) ->
		@pages[pageName]

	loadRootPage: (options) ->
		# rewrite this
		@loadPage(@startPage)

	loadResource: (resourceName, options) ->
		# rewrite this
		@resources[resourceName]

	start: (callback) ->
		express = require 'express'
		fs = require 'fs'
		path = require 'path'
		resourcesAdapter = require '../modules/resource'

		app = express()
		app.use express.bodyParser()

		memoryModels = {}

		#for pageName, page of @pages
		#	for type in page.getRequiredTypes()
		#		memoryModels[type.name] = type.dbmodel
        #
		#resourcesAdapter app: app, models: memoryModels

		app.get '/favicon.ico', (req, res) -> res.send()

		app.get '/', (req, res) => 
			res.send @loadRootPage(req.query)

		app.get '/:page', (req, res) =>
			pageName = req.params.page
			options = req.query
			res.send @loadPage(pageName, options).toHtml()


		restApi = new RestApiRouter(@loadResource)
		restApi.route(app)

		app.use express.static(__dirname + "/../")

		@server = app.listen 3000, callback

	stop: ->
		@server.close()

	debug: (str) ->
		console.log(str)

class RestApiRouter
	constructor: ( @loadResource ) ->

	route: (app) ->
		app.get     '/resource/:resource',     @getAll
		app.get     '/resource/:resource/new', @getNew
		app.get     '/resource/:resource/:id', @getById
		app.post    '/resource/:resource',     @create
		app.put     '/resource/:resource/:id', @updateById
		app.delete  '/resource/:resource/:id', @deleteById

	getAll: (req, res)     => @runAction req, res, 'all' 
	getNew: (req, res)     => @runAction req, res, 'new' 
	getById: (req, res)    => @runAction req, res, 'get'
	create: (req, res)     => @runAction req, res, 'create'
	updateById: (req, res) => @runAction req, res, 'update'
	deleteById: (req, res) => @runAction req, res, 'delete'

	runAction: ( req, res, actionName ) ->
		params =
			id:   req.params.id
			name: req.params.resource
			options: req.query
			data: req.body

		resource = @loadResource( params.name, params.options )

		console.log params.data

		resource[actionName]( params, (data) -> res.send(data) )




