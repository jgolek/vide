
pageToHtml = require './Page.html.coffee'
pageToJs = require './Page.js.coffee'
Resource = require './Resource'
Element = require './Element'


module.exports = 
class Page
	requiredModules: [
		{ js: 'modules/jquery/jquery-1.7.1-min.js' },
		{ js: 'modules/jquery/jquery.parsequery.js' },
		{ js: 'modules/resource/lib/resource-client.js' },
		{ js: 'modules/knockoutjs/knockout-2.1.0.js' },
		{ js: 'modules/bootstrap/2.3.0/bootstrap.js', css: 'modules/bootstrap/2.3.0/bootstrap.css' },
		{ css: 'modules/bootstrap/2.3.0/font-awesome.css' }
	]

	constructor: (model) ->
		throw Error 'model is not defined' if !model

		@name = model.name
		@elements = model.elements ? []
		@resources = []
		@requiredModules.push module for module in model.requiredModules ? []
		console.log @requiredModules

	element: (data) -> 
		@elements.push new Element data

	resource: (data) ->
		resource = new Resource data
		@resources.push resource

	toHtml: -> 
		pageToHtml(this)

	toJs: ->
		pageToJs(this)

	getRequiredTypes: -> 
		requiredTypes = []

		add = (item) ->
			requiredTypes.push item if requiredTypes.indexOf(item) == -1
			
		for resource in @resources
			add resource.type
			add type for type in resource.type.requiredTypes ? []
		requiredTypes

	getRequiredWidgets: ->
		( element.widget for element in @elements )

