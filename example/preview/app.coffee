App = require '../../lib/App'
Page = require '../../lib/Page'
FsWidget = require '../../lib/FsWidget'

yaml = require 'js-yaml'


class WidgetApp extends App
	constructor: (data) ->
		@basedir = data.directory

	loadPage: ( pageName, options ) ->
		page = new Page name: pageName + 'Preview'
		widget = new FsWidget( directory: @basedir + '/' + pageName.toLowerCase() )
		
		if options.model 
			modelData = JSON.parse(options.model || '{}' )
		else
			modelData = widget.testdata

		page.element
			name: 'element1'
			width: options.width || 460
			height: options.height || 300
			x: options.x || 10
			y: options.y || 10
			border: options.border || 0
			bind: widget.with( modelData )

		page.toHtml()

	loadRootPage: (options) ->
		page = new Page name: 'Widgets Preview'
		listWidget = new FsWidget( directory: __dirname + '/widgets/list' )

		widgets = [
			name: 'demo'
		]

		data = 
			items:  """js: #{JSON.stringify(widgets)}"""

		page.element
			name: 'element1'
			width: options.width || 460
			height: options.height || 300
			x: options.x || 10
			y: options.y || 10
			border: options.border || 0
			bind: listWidget.with( data )
		page.toHtml()


argv = require('optimist')
    .usage('Usage: $0 -d [dir]')
    .demand(['d'])
    .argv;

app = new WidgetApp
	directory: argv.d

#app = new App


app.start ->
	console.log "App started!"