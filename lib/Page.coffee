
pageToHtml = require './Page.html.coffee'
pageToJs = require './Page.js.coffee'
Resource = require './Resource'

module.exports = 
class Page
	requiredModules: [
		{ js: 'modules/jquery/jquery-1.7.1-min.js' },
		{ js: 'modules/jquery/jquery.parsequery.js' },
		{ js: 'modules/resource/lib/resource-client.js' },
		{ js: 'modules/knockoutjs/knockout-2.1.0.js' }
	]

	constructor: (model) ->
		throw Error 'model is not defined' if !model

		@name = model.name
		@elements = model.elements ? []
		@resources = []

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
		requiredTypes.add = (item) ->
			requiredTypes.push item if this.indexOf(item) == -1

		for resource in @resources
			requiredTypes.add resource.type
			requiredTypes.add type for type in resource.type.requiredTypes
		requiredTypes

	getRequiredWidgets: ->
		( element.widget for element in @elements )


class Element
	constructor: (model) ->
		@name     = model.name ? "elementNameNotSet"
		@width    = model.width   ? 100
		@height   = model.height ? 100
		@y        = model.y ? 0
		@x        = model.x ? 0
		@border   = model.border ? 0
		@position = model.position ? "absolute"
		@widget   = model.widget ? model.bind ? html: ""

	toCss: ->
		"""
		  ##{@name} {
		     width:    #{@width}px;
		     height:   #{@height}px;
		     top:      #{@y}px;
		     left:     #{@x}px;
		     position: #{@position};
		     border:   #{@border}px solid;
		  }
		"""

