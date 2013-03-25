class WidgetApp extends App
	constructor: (data) ->
		@basedir = data.directory

	loadPage: ( pageName, options ) ->
		page   = new Page name: pageName + 'Preview'
		widget = new FsWidget( directory: @basedir + '/' + pageName.toLowerCase() )
		
		if options.model 
			modelData = JSON.parse(options.model || '{}' )
		else
			modelData = widget.testdata

		page.element
			name: 'element1'
			width:  options.width || 460
			height: options.height || 300
			x:      options.x || 10
			y:      options.y || 10
			border: options.border || 0
			bind: widget.with( modelData )

		return page

	loadRootPage: (options) ->
		rootPage   = new Page name: 'Widgets Preview'
		listWidget = new FsWidget( directory: __dirname + '/widgets/list' )

		widgets = @loadWidgetsList()

		listWidgetData = 
			items: -> JSON.stringify(widgets)

		rootPage.element
			name: 'element1'
			width: options.width || 460
			height: options.height || 300
			x: options.x || 10
			y: options.y || 10
			border: options.border || 0
			bind: listWidget.with( listWidgetData )
		return rootPage

	loadWidgetsList: ->
		fs.readdirSync(@basedir)

module.exports = WidgetApp