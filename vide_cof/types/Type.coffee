module.exports =
class Type
	constructor: (data)->
		@name = data.name
		@js = data.js;
		@requiredTypes = data.requiredTypes;
		@definition = data.definition

