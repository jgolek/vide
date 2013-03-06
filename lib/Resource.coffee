Type = require './Type'

module.exports =
class Resource
	constructor: (model) ->
		@name = model.name
		@type = model.type
		@url = model.url


