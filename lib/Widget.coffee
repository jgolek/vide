Resource = require './Resource'

module.exports =
class Widget
	constructor: (data) ->
		@name = data.name
		@viewmodel = data.viewmodel
		@view = data.view
		@bindings = data.bindings
		@requiredTypes = data.requiredTypes ? []

	with: (bindings) ->
		requiredTypes = []
		
		new Widget name: @name, viewmodel: @viewmodel, view: @view, bindings: bindings, requiredTypes: requiredTypes

