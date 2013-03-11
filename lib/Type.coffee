Schema = require('jugglingdb').Schema;
schema = new Schema('memory');

module.exports =
class Type
	constructor: (data)->
		@name = data.name
		@model = data.model
		@js = data.js || @buildJsModel()
		@requiredTypes = data.requiredTypes ? []
		@dbmodel = data.dbmodel || @buildDbModel()

	buildJsModel: ->
		properties = [];
		properties.push "\n    this.id = data.id;"

		for property, defintion of @model
			switch defintion.type
				when String then 	  properties.push "\n    this.#{property} = data.get('#{property}');"
				when Schema.JSON then properties.push "\n    this.#{property} = data.get('#{property}');"

		#properties = ("\n    this.#{property} = data.get('#{property}');" for property, defintion of @model )
		
		"""
		function #{@name}(data){#{properties.join('\n')}
		}
		"""

	buildDbModel: ->
		schema.define(@name, @model)
