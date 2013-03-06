Type = require './Type'

module.exports =
class Resource
	constructor: (model) ->
		@name = model.name
		@type = model.type
		@url = model.url
		@definition = {}
		@definition.toString = => @name
		@addBinding alias, type for alias, type of model.type.definition
		console.log("type", model.type)

	addBinding: (name, type) ->
		@definition[name] = @name + "()." + name
		console.log("definition", @definition)
