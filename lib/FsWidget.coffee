Widget = require './Widget'
fs =  require 'fs'

module.exports =
class FsWidget extends Widget
	constructor: (data) ->
		if(!data.directory) then throw new Error "directory isn't set"
		@name = data.name
		@view = fs.readFileSync(data.directory + '/view.html', 'utf8')
		@viewmodel = fs.readFileSync(data.directory + '/viewmodel.js', 'utf8')

	with: (bindings) ->
		requiredTypes = []
		new Widget name: @name, viewmodel: @viewmodel, view: @view, bindings: bindings, requiredTypes: requiredTypes

