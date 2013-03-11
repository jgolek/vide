Type = require './Type'

module.exports =
class Resource
	constructor: (model) ->
		@name = model.name || throw new Error ('model.name not defined')
		@type = model.type || throw new Error ('model.type not defined')
		@url = model.url   || throw new Error ('model.url not defined')

