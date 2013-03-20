Resource = require './Resource'

module.exports =
class Widget
	constructor: (data) ->
		@name = data.name
		@view = data.view 
		@viewmodel = data.viewmodel || "function #{data.name}(){}"
		@model = data.model ? {}
		@bindings = data.bindings
		@requiredTypes = data.requiredTypes ? []

	with: (bindings) ->
		requiredTypes = []
		@validateBindings(bindings)
		
		new Widget name: @name, viewmodel: @viewmodel, view: @view, bindings: bindings, requiredTypes: requiredTypes

	validateBindings: (bindings) ->

		if not @model then throw new Error( "model is not defined" )

		for property, type of @model
			if not bindings[property] then throw new Error( "Property #{property} is missing" )

		#throw new Error('no bindings defined')
