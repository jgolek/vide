Widget = require './Widget'
fs =  require 'fs'

dox = require 'dox'

module.exports =
class FsWidget extends Widget
	constructor: (data) ->
		if(!data.directory) then throw new Error "directory isn't set"
		super(data)

		@view = fs.readFileSync(data.directory + '/view.html', 'utf8')
		js = fs.readFileSync(data.directory + '/viewmodel.js', 'utf8')

		doxObj = dox.parseComments(js)
		
		viewmodelObj = doxObj[0]
		@viewmodel = viewmodelObj.code

		for tag in viewmodelObj.tags
			parts = tag.name.split('.')
			if parts.length > 1
				@model[parts[1]] = tag.types[0];

	#with: (bindings) ->
	#	requiredTypes = []
	#	new Widget name: @name, viewmodel: @viewmodel, view: @view, bindings: bindings, requiredTypes: requiredTypes

