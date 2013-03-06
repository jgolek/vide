
pageToHtml = require './Page.html.coffee'
pageToJs = require './Page.js.coffee'

Resource = require './Resource'


module.exports = 
class Page
	requiredModules: []

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
		@resource[data.name] = resource.definition

	toHtml: -> 
		pageToHtml(this)

	toJs: ->
		pageToJs(this)

class Element
	constructor: (model) ->
		@name     = model.name ? "elementNameNotSet"
		@width    = model.width   ? 100
		@height   = model.height ? 100
		@y        = model.y ? 0
		@x        = model.x ? 0
		@border   = model.border ? 0
		@position = model.position ? "absolute"
		@widget   = model.widget ? html: ""

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
