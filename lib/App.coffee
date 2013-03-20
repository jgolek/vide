
module.exports = class App

	#
	# data.appDirectory 
	#
	constructor: (data) ->
		@pages = {}
		@startPage = data?.startPage || 'start'
		if data?.directory
			@appDirectory = data.directory
			@pagesDirectory = data.directory + '/pages/'

		console.log 'start app'

	loadPage: (pageName) ->
		@pages[pageName].toHtml()

	loadRootPage: () ->
		@loadPage(@startPage)

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

		app.get '/', (req, res) => 
			res.send @loadRootPage(req.query)

		app.get '/:page', (req, res) =>
			#console.log 'page:', @pages[req.params.page] # TODO validation
			if @appDirectory 
				pagePath = @pagesDirectory+'/'+req.params.page+'.coffee';
				delete require.cache[require.resolve(pagePath)]
				res.send require(pagePath).toHtml()
			else
				res.send @loadPage(req.params.page, req.query)

		app.use express.static(__dirname + "/../")
		app.use express.static(@appDirectory + '/public/')


		app.get '/modules123/*', (req, res) =>
			filePath = __dirname + '/../' + req._parsedUrl.pathname
			#console.log 'file path', filePath

			fs.readFile filePath, 'utf8', (err, file) ->
				switch path.extname(filePath)
					when '.js' then res.set('Content-Type', 'text/javascript')
					when '.css' then res.set('Content-Type', 'text/css')
					when '.ttf' then res.set('Content-Type', 'application/x-font-ttf')
					when '.woff' then res.set('Content-Type', 'application/octet-stream')

				
				if err then console.log(req, "ERROR", req.url)
				

				res.send file ? err

		app.listen 3000, callback




